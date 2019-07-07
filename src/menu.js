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
    let pag1 = document.getElementById('p1');
    const tab2butt = document.getElementById('tab2butt');
    let tab2 = document.getElementById('tab2');
    let pag2 = document.getElementById('p2');
    const tab3butt = document.getElementById('tab3butt');
    let tab3 = document.getElementById('tab3');
    let pag3 = document.getElementById('p3');

    tab1butt.addEventListener('mouseup', e => {
      tab1.style.display = "block";
      tab2.style.display = "none";
      tab3.style.display = "none";
      pag1.classList.add('is-active');
      pag2.classList.remove('is-active');
      pag3.classList.remove('is-active');
    });

    tab2butt.addEventListener('mouseup', e => {
      tab1.style.display = "none";
      tab2.style.display = "block";
      tab3.style.display = "none";
      pag1.classList.remove('is-active');
      pag2.classList.add('is-active');
      pag3.classList.remove('is-active');
    });

    tab3butt.addEventListener('mouseup', e => {
      tab1.style.display = "none";
      tab2.style.display = "none";
      tab3.style.display = "block";
      pag1.classList.remove('is-active');
      pag2.classList.remove('is-active');
      pag3.classList.add('is-active');
    });
  }

}
export default Menu;
