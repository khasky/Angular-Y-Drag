(function () {
	'use strict';
	angular.module('ngYDrag', [])
		.directive('ngYDragItems', ['$document', '$timeout', function ($document, $timeout) {
			return {
				restrict: 'A',
				scope: {
					ngYDragItems: '=',
					ngYDragStart: '&?',
					ngYDragBefore: '&?',
					ngYDragAfter: '&?'
				},
				controller: ['$scope', '$element', function ($scope, $element) {
					var startY = 0;
					var movingElem, movingItem;
					var swappingElem, swappingItem;
					var movingIndex, nextIndex;
					var swappedItemsCount = 0;
					var bOnStart = false;
					
					function isEnabled () {
						return $scope.ngYDragItems && $scope.ngYDragItems.length > 1;
					}
					
					function setPosition (pos) {
						if (!movingElem)
							return;
						
						movingElem.css({ 'top': pos + 'px' });
					}
					
					function mouseMove ($event) {
						if (!bOnStart) {
							bOnStart = true;
							
							if ($scope.ngYDragStart)
								$scope.ngYDragStart({ movingItem: movingItem });
						}
						
						var iTopPos = $event.clientY - startY;
						var bMoveLower = iTopPos > 0;

						movingIndex = $scope.ngYDragItems.indexOf(movingItem);

						if (movingIndex < 0)
							return;
						
						// block move up first item
						if (movingIndex == 0 && iTopPos <= 0) {
							iTopPos = 0;
						}
						
						// block move down last item
						if (movingIndex == ($scope.ngYDragItems.length - 1) && iTopPos >= 0) {
							iTopPos = 0;
						}
						
						setPosition(iTopPos);
						
						iTopPos = Math.abs(iTopPos);
						
						var movingHeight = movingElem[0].offsetHeight;
						var swappingHeight = 0;
						
						nextIndex = movingIndex + (bMoveLower ? 1 : -1);
						
						if (nextIndex < 0 || nextIndex > $scope.ngYDragItems.length - 1)
							return;
						
						// find siblings and check heights
						var siblings = $element.children('.ng-y-drag');
						
						if (siblings) {
							swappingElem = siblings.eq(nextIndex);
							
							if (swappingElem && swappingElem.length) {
								swappingHeight = swappingElem[0].offsetHeight;
							}
						}
						
						if (!swappingHeight)
							return;
						
						if (iTopPos <= swappingHeight)
							return;
						
						swappingItem = $scope.ngYDragItems[nextIndex];
						
						$scope.$apply(function () {
							var changeItems = true;
							
							if ($scope.ngYDragBefore)
								changeItems = $scope.ngYDragBefore({ movingItem: movingItem, swappingItem: swappingItem });
							
							if (changeItems) {
								// change indexes
								$scope.ngYDragItems[movingIndex] = swappingItem;
								$scope.ngYDragItems[nextIndex] = movingItem;
								
								swappedItemsCount++;
								startY = $event.clientY;
								setPosition(0);
							}
						});
					}
					
					function mouseUp ($event) {
						if ($scope.ngYDragAfter && swappedItemsCount > 0)
							$scope.ngYDragAfter({ movingItem: movingItem, swappingItem: swappingItem });
						
						setPosition(0);
						
						$document.unbind('mousemove', mouseMove);
						$document.unbind('mouseup', mouseUp);
						
						movingElem.removeClass('active');
						
						swappedItemsCount = 0;
					}
					
					this.setMovingItem = function (elem, item, yPos) {
						movingElem = elem;
						movingItem = item;
						startY = yPos;
						
						elem.addClass('active');
						
						$document.bind('mousemove', mouseMove);
						$document.bind('mouseup', mouseUp);
					};
				}]
			};
		}])
		.directive('ngYDragItem', ['$timeout', function ($timeout) {
			return {
				restrict: 'A',
				require: '^ngYDragItems',
				scope: {
					ngYDragItem: '=',
					ngYDragLocked: '=?'
				},
				link: function (scope, elem, attrs, containerCtrl) {
					function isEnabled () {
						return scope.ngYDragItem && !scope.ngYDragLocked;
					}
					
					elem.bind('mousedown', function ($event) {
						if (!isEnabled())
							return;

						// prevent text selection on mouse move
						$event.preventDefault();

						containerCtrl.setMovingItem(elem, scope.ngYDragItem, $event.clientY);
					});

					$timeout(function () {
						elem.addClass('ng-y-drag');
					});
				}
			};
		}])
})();