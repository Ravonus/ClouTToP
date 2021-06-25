window.addEventListener('load', function () {
  const b = document.body;

  b.addEventListener(
    'click',
    function (event) {
      console.log(event.pageX, event.pageY);
    },
    false
  );
});
