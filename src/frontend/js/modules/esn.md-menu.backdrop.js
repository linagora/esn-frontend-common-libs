angular.module('esn.md-menu.backdrop', [])
  .directive('mdMenuBackdropFix', function() {
    return {
      restrict: 'A',
      link
    };

    function link(scope, element, attrs) {
      const observer = observe();

      element.click(changeBackdropZIndex);

      element.on('$destroy', () => {
        observer.disconnect();
      });

      function changeBackdropZIndex() {
        observe();
      }

      function observe() {
        const mutationObserver = new MutationObserver((mutations, observer) => {
          mutations.forEach(mutation => {
            if (!mutation.addedNodes.length || mutation.addedNodes[0].nodeName.toLowerCase() !== 'md-backdrop') return;

            mutation.addedNodes[0].style = attrs.mdMenuBackdropFix ? `z-index: ${attrs.mdMenuBackdropFix};` : 'z-index: 1999;';

            observer.disconnect();
          });
        });

        mutationObserver.observe(document.body, { childList: true });

        return mutationObserver;
      }
    }
  });
