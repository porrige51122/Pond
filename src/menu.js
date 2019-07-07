class Menu {
  constructor(pond) {
    const hide = document.getElementById('hidecheck');
    const refresh = document.getElementById('refresh');

    this.hidden = false;
    this.screenRatio = 3/4;
    hide.addEventListener('change', e => {
      let x = document.getElementById('selections');
      if (e.target.checked) {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    });

    // Initialise the variables
    pond.tadpoleSize = document.getElementById('tadpoles').value;
    pond.fishSize = document.getElementById('fish').value;
    pond.lilySize = document.getElementById('lillies').value;

    refresh.addEventListener('mouseup', e => {
      pond.tadpoleSize = document.getElementById('tadpoles').value;
      pond.fishSize = document.getElementById('fish').value;
      pond.lilySize = document.getElementById('lillies').value;
      pond.init();
    });

    // Change Tabs
    const tab1butt = document.getElementById('tab1butt');
    let tab1 = document.getElementById('tab1');
    const tab2butt = document.getElementById('tab2butt');
    let tab2 = document.getElementById('tab2');
    const tab3butt = document.getElementById('tab3butt');
    let tab3 = document.getElementById('tab3');

    tab1butt.addEventListener('mouseup', e => {
      tab1.style.display = "block";
      tab2.style.display = "none";
      tab3.style.display = "none";
    });

    tab2butt.addEventListener('mouseup', e => {
      tab1.style.display = "none";
      tab2.style.display = "block";
      tab3.style.display = "none";
    });

    tab3butt.addEventListener('mouseup', e => {
      tab1.style.display = "none";
      tab2.style.display = "none";
      tab3.style.display = "block";
    });
  }

}
export default Menu;
