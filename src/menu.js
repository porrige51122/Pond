import * as colours from './colours';

class Menu {
  constructor(pond) {
    const hide = document.getElementById('hidecheck');
    const refresh = document.getElementById('refresh');

    this.hidden = false;
    this.screenRatio = 3 / 4;
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

    const colour = document.getElementsByName('colour');

    for (let i = 0; i < colour.length; i++) {
      colour[i].addEventListener('click', e => {
        if (e.target.value == 'summer') {
          colours.ocean_blue = '#94D0FF',
          colours.deep_blue = 'rgba(135,149,232,0.7)',
          colours.pond_shadow = 'rgba(11, 45, 99, 0.7)',
          colours.yellow = '#fdf3b8',
          colours.orange_peel = '#FCC08F',
          colours.bark = '#917e7e',
          colours.khaki = '#F0E68C',
          colours.olive = '#808000',
          colours.forest_green = '#68BA71',
          colours.dark_green = '#388941',
          colours.pea = '#60A568',
          colours.yellow_green = '#acff78',
          colours.light_green = '#90ee90',
          colours.lily_green = '#B4E8AC',
          colours.pink = '#FF6AD5',
          colours.leaf_brown = '#ecb4bf',
          colours.delicate_pink = '#FF9BE2',
          colours.light_pink = '#FFBCEC',
          colours.purple = '#9370DB',
          colours.indigo = '#4B0082',
          colours.registration_black = '#000000',
          colours.rasin_black = '#212121',
          colours.dark_gray = '#474747',
          colours.rock_gray = '#606060',
          colours.gray = '#808080';
        } else if (e.target.value == 'autumn') {
          colours.ocean_blue = '#489191';
          colours.deep_blue = 'rgba(58,117,117,0.7)';
          colours.yellow = '#FFC201';
          colours.orange_peel = '#FF9962';
          colours.bark = '#552250F';
          colours.khaki = '#F0E68C';
          colours.olive = '#808000';
          colours.forest_green = '#A85832';
          colours.dark_green = '#66331F';
          colours.pea = '#663636';
          colours.yellow_green = '#FCB5B5';
          colours.light_green = '#90ee90';
          colours.lily_green = '#B4E8AC';
          colours.pink = '#FCB5B5';
          colours.leaf_brown = '#BC8274';
          colours.delicate_pink = '#FCDDF2';
          colours.light_pink = '#FAF6F6';
          colours.purple = '#9370DB';
          colours.indigo = '#4B0082';
          colours.registration_black = '#000000';
          colours.rasin_black = '#212121';
          colours.dark_gray = '#72583D';
          colours.rock_gray = '#7F6244';
          colours.gray = '#BD9267';
        } else {
          console.log("Error: radio button has no value")
        }
      });
    }
  }
}
export default Menu;
