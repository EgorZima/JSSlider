class Slider {
  constructor () {
    this.currentImage = 0;
    this.slider = document.querySelector('.slider');
    this.sliderImagesNode = this.slider.querySelector('.images-wrap');
    this.imagesWrap = document.querySelector('.images-wrap');
    this.prevArrow = this.slider.querySelector('.arrow-previous');
    this.nextArrow = this.slider.querySelector('.arrow-next');
    this.paginationNode = this.slider.querySelector('.slider-pagination');
    this.addButton = document.querySelector('.add-button');
    this.file = document.querySelector('.file');
    this.sliderImages = document.querySelector('.slider-images');
    this.thirdItem = document.querySelector('.third-item');
    this.navs = document.querySelector('.navs');

    this.sizes = document.querySelector('.sizes')
    this.small = document.querySelector('.small');
    this.middle = document.querySelector('.middle');
    this.large = document.querySelector('.large');
    this.imagesContent = document.querySelectorAll('.images-content')

    this.editForm = document.querySelector('.edit-form');
    this.edit;
    this.buttonEdit;
    this.addTextButton = document.querySelector('.add-text-button');

    this.currentSlideIndex = this.currentImage;
    this.imagesCount = this.sliderImagesNode.children.length;
    this.slideSize = this.sliderImagesNode.offsetWidth;

    this.sizes.addEventListener('click', (e) => {
      this.size(e);
    })
    
    this.prevArrow.addEventListener('click', (event) => {
      this.prev(event) 
    });

    this.nextArrow.addEventListener('click', (e) => {
      this.next(e) 
    });

    this.paginationNode.addEventListener('click', (e) => {
      this.pagination(e) 
    });

    this.addButton.addEventListener('click', (e) => {
      this.addImage(e) 
    });

    this.file.addEventListener('change', (e) => {
      this.uploadImg(e);
    });

    this.addTextButton.addEventListener('click', (e) => {
      this.addText(e);
    })

    this.thirdItem.addEventListener('click', (e) => {
      this.showNavs(e);
    })

    this.navs.addEventListener('click', (e) => {
      this.chooseNav(e)
    })


    
    this.init();
    this.render();
  }


  init() {
     this.createPaginationItem();
     this.imagesWrap.children[this.currentSlideIndex].classList.add('currentImage');
     this.large.classList.add('active-size');

     let self = this;
     self.timer = setInterval(function() {
      self.next()	
     }, 10000);
		  
  }

  render() {
    let directionStyle = 'marginLeft';
    this.slideSize = this.sliderImagesNode.offsetWidth;

    this.imagesWrap.children[0].style[directionStyle] = -(this.currentSlideIndex * this.slideSize) + 'px';

    this.imagesWrap.querySelector('.currentImage').classList.remove('currentImage')
    this.imagesWrap.children[this.currentSlideIndex].classList.add('currentImage');

    this.paginationNode.querySelector('.active').classList.remove('active');
    this.paginationNode.children[this.currentSlideIndex].querySelector('a').classList.add('active'); 
 
    this.edit = document.querySelectorAll('.fa-pencil');
    this.buttonEdit = document.querySelectorAll('.edit-button'); 

    for (let i = 0; i < this.edit.length; i++) {
      this.edit[i].addEventListener('click', (e) => {
        this.showInput(e)
      });
    }

    for (let i = 0; i < this.buttonEdit.length; i++) {
      this.buttonEdit[i].addEventListener('click', (e) => {
        this.saveEdit(e)
      });
    }

  }


  createPaginationItem() {
   	this.paginationNode.querySelector('a').dataset.sliderItem = 0;
   
   	for (let i = 0; i < this.imagesCount - 1; i++) {
   	   let cloneElem = this.paginationNode.querySelector('.slider-pagination-item');
   	    
   	   let newElem = cloneElem.cloneNode(true);
       newElem.querySelector('a').dataset.sliderItem = i + 1;           
       this.paginationNode.appendChild(newElem);
    }  
    this.paginationNode.children[this.currentSlideIndex].classList.add('active');
  }

  updatePagination() {
   	   let cloneElem = this.paginationNode.querySelector('.slider-pagination-item');  
   	   let newElem = cloneElem.cloneNode(true);

       newElem.querySelector('a').dataset.sliderItem = this.imagesCount - 1; 
      
       if ( newElem.querySelector('a').classList.contains('active') ) {
        newElem.querySelector('a').classList.remove('active');
       }   
       this.paginationNode.appendChild(newElem);      
  }

  prevSlide() {
  	if(this.currentSlideIndex === 0 ) {
  		this.currentSlideIndex = this.imagesCount - 1;
  		return
  	}
    this.currentSlideIndex--;
  } 

  nextSlide() {
  	if(this.currentSlideIndex === this.imagesCount - 1) {
  		this.currentSlideIndex = 0;
  		return
  	}
    this.currentSlideIndex++;    
  }

  prev() {
  	this.prevSlide()
  	this.render()
  }

  next() {
  	this.nextSlide();
  	this.render()
  }

  pagination(e) {
    e.preventDefault();
    let link = e.target;

    if ( link.tagName !== 'A' ) return 
    
    this.currentSlideIndex = +link.dataset.sliderItem;
    this.render();
  }

  addImage(e) {
    let modalBody = e.target.parentNode;
    let modalInput = modalBody.children[1];
    if (!modalInput.value.length) {
        modalBody.querySelector('.alert').classList.remove('hide')
        return
    }

    if (!modalBody.querySelector('.alert').classList.contains('hide')) {
      modalBody.querySelector('.alert').classList.add('hide')
    }

    let link = modalInput.value;
    let img = document.createElement('img');
    img.src = link;
    modalInput.value = '';

    let current = this.slider.querySelector('.active-size').classList[0];
    let height;
    if (current === 'large') {
      height = 500;
    } else if (current === 'middle') {
      height = 400;
    } else {
      height = 300;
    }

    img.style['height'] = height + 'px';
    
    this.appendImg(img, e.target)
  }

  addText(e) {
    let modalBody = e.target.parentNode;
    let modalInput = modalBody.children[1];
    if (!modalInput.value.length) {
        modalBody.querySelector('.alert').classList.remove('hide')
        return
    }

    if (!modalBody.querySelector('.alert').classList.contains('hide')) {
      modalBody.querySelector('.alert').classList.add('hide')
    }

    let text = modalInput.value;
    let tmpl = `   <i class="fa fa-pencil" aria-hidden="true"></i> 
                      <p class="text"> ${text} </p>

                      <div class="edit-form hide">
                      <input type="text" value="" placeholder="" class="edit-input"> 
                      <button class="edit-button"> SAVE </button>
                    </div>
                `
    modalInput.value = '';
  
    this.appendText(tmpl, modalBody)
 }
  
  uploadImg(e) {
    if (this.file.files && this.file.files[0]) {
          var reader = new FileReader();
          reader.onload = imageIsLoaded;
          reader.readAsDataURL(this.file.files[0]);
    }
    
    let self = this;
    let target = e.target;

    function imageIsLoaded(e) {
      let link = e.target.result;
      let img = document.createElement('img');
      img.src = link;

      let current = self.slider.querySelector('.active-size').classList[0];
      let height;
      if (current === 'large') {
        height = 500;
      } else if (current === 'middle') {
        height = 400;
      } else {
        height = 300;
      }
      img.style['height'] = height + 'px';
    
      self.appendImg(img, target)
    };
  }  
  
  appendImg(img, target) {
    let div = document.createElement('div');
    div.className = 'images-content';
    div.appendChild(img)
    this.imagesWrap.appendChild(div);
    this.imagesCount++; 

    let modal = target.parentNode.parentNode.parentNode;

    modal.classList.remove('block')
    this.updatePagination();
    this.currentSlideIndex = this.imagesWrap.childElementCount - 1;
    this.render(); 
  }

  appendText(tmpl, modal) {
    let currentImage = this.imagesWrap.querySelector('.currentImage');
    if (currentImage.querySelector('.img-text')) {
      let alert = modal.querySelector('.alert');

      let alertTwo = modal.querySelector('.alert-two');
      alertTwo.classList.remove('hide');

      setTimeout(() => {
        let modalDiv = modal.parentNode.parentNode;
        modalDiv.classList.remove('block');
        alert.classList.add('hide');
        alertTwo.classList.add('hide')
      }, 1500);
      return
    }

    let span = document.createElement('span');
    span.className = 'img-text';
    span.innerHTML = tmpl;

    let current = this.slider.querySelector('.active-size').classList[0];
    let top;
    if (current === 'large') {
      top = 420;
    } else if (current === 'middle') {
      top = 320;
    } else {
      top = 230;
    }
    span.style['top'] = top + 'px';
    currentImage.appendChild(span);

    let modalDiv = modal.parentNode.parentNode;
    
    modalDiv.classList.remove('block');
    this.render()
  }

 showInput(e) {
   let form = e.target.parentNode.children[2];
   form.classList.remove('hide')

   let parent = e.target.parentNode;
   let value = parent.querySelector('p').innerHTML;
   parent.querySelector('input').value = value;
 }

 saveEdit(e) {
   let value = e.target.previousElementSibling.value;
   let p = e.target.parentNode.parentNode.children[1];
   p.innerHTML = value;

   e.target.parentNode.classList.add('hide');   
 }

 size(e) {
      if(e.target.classList[0] === 'small') {
        this.sizeChange('small', 700, 300, 300, 230, 170);
        return
      } else if (e.target.classList[0] === 'middle') {
        this.sizeChange('middle',800, 400, 400, 330, 220)
        return
      } else if (e.target.classList[0] === 'large') {
        this.sizeChange('large', 936, 500, 500, 420, 240)
        return
      }
  }

  sizeChange(classNa, width, height, imgHeight, textTop, arrowTop) {
    this.currentSlideIndex = 0;
    this.render();

    if (this.sizes.querySelector('.active-size')) {
        this.sizes.querySelector('.active-size').classList.remove('active-size')
    }
    let size = document.querySelector('.' + classNa) 
    size.classList.add('active-size');

    this.sliderImages.style['width'] = width + 'px';
    this.sliderImages.style['height'] = height + 'px';

    let imgs = this.sliderImages.querySelectorAll('img');
      
    for ( let i = 0; i < imgs.length; i++) {
      imgs[i].style['height'] = imgHeight + 'px'
    }

    let imagesCon = document.querySelectorAll('.images-content');

    for (let i = 0; i < imagesCon.length; i++) {
      imagesCon[i].style['height'] = imgHeight + 'px';

      if (imagesCon[i].querySelector('.img-text')) {
        imagesCon[i].querySelector('.img-text').style['top'] = textTop + 'px';
      }
    }

    let arrows = this.slider.querySelectorAll('.arrow')
    
    for (let i = 0; i < arrows.length; i++) {
      arrows[i].style['top'] = arrowTop + 'px'
    }
  }

  showNavs(e) {
    e.preventDefault();
    if (e.target.parentNode.classList.contains('third-item')) {
       e.target.parentNode.children[1].classList.remove('hide')
    }  
  }

  chooseNav(e) {
    if (e.target.tagName === 'I') {
    let INext = e.target;
  
    let array = e.target.classList[1].split('-');
    let index = array.indexOf('right');

    if (index !== -1) {
        array[index] = 'left';
    }
    
    let ok = array.join('-');

    let clone = e.target.cloneNode(true);
    let classs = clone.classList[1];
    clone.classList.remove(classs);
    clone.classList.add(ok)
    let IPrev = clone;

    this.prevArrow.innerHTML = '';
    this.nextArrow.innerHTML = '';

    this.prevArrow.appendChild(IPrev);
    this.nextArrow.appendChild(INext);
    
    document.querySelector('.third-item').children[1].classList.add('hide')
    }
  }



}


class ModalWindow {
  constructor() {
    this.modalTrigger = document.querySelectorAll('.modal-trigger');
    this.modal = document.querySelectorAll('.modal');
    this.closeModal = document.querySelectorAll('.close-modal');
    this.modalBody = document.querySelector('.modal-body');

    for ( let i = 0; i < this.modalTrigger.length; i++) {
      this.modalTrigger[i].addEventListener('click', () => {
        let attr = this.modalTrigger[i].getAttribute("data-modal");

        if(attr === 'modal-image') {
          this.modal[0].classList.add('block');
          return
        }
        this.modal[1].classList.add('block')
      })
    }
    

    for ( let i = 0; i < this.closeModal.length; i++) {
        
        this.closeModal[i].addEventListener('click', () => {
          let parent = this.closeModal[i].parentNode.parentNode.parentNode;
          let attr = parent.getAttribute('id')

          if (attr === 'modal-image') {
            if (!this.modalBody.querySelector('.alert').classList.contains('hide')) {
            this.modalBody.querySelector('.alert').classList.add('hide')
            parent.classList.remove('block')
            return 
            }
          }

          parent.classList.remove('block')
        })  
    }
  }
}



