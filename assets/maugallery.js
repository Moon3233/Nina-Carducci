document.addEventListener('DOMContentLoaded', function() {
    mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top',
        navigation: true
    });
});

function mauGallery(options) {
  var gallery = document.querySelector('.gallery');
  var tagsCollection = [];

  createRowWrapper(gallery);

  if (options.lightBox) {
    createLightBox(gallery, options.lightboxId, options.navigation);
  }
  listeners(options);

  var galleryItems = gallery.querySelectorAll('.gallery-item');
  galleryItems.forEach(function(item) {
    responsiveImageItem(item);
    moveItemInRowWrapper(item);
    wrapItemInColumn(item, options.columns);

    var theTag = item.getAttribute('data-gallery-tag');
    if (options.showTags && theTag && !tagsCollection.includes(theTag)) {
      tagsCollection.push(theTag);
    }
  });

  if (options.showTags) {
    showItemTags(gallery, options.tagsPosition, tagsCollection);
  }

  gallery.style.display = 'block';
}

function listeners(options) {
  var galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
      if (options.lightBox && item.tagName === 'IMG') {
        openLightBox(item, options.lightboxId);
      }
    });
  });

  document.querySelector('.gallery').addEventListener('click', function(event) {
    if (event.target.classList.contains('nav-link')) {
      filterByTag(event.target);
    }
    if (event.target.classList.contains('mg-prev')) {
      prevImage(options.lightboxId);
    }
    if (event.target.classList.contains('mg-next')) {
      nextImage(options.lightboxId);
    }
  });
}

function createRowWrapper(element) {
  if (!element.firstElementChild || !element.firstElementChild.classList.contains('row')) {
    var row = document.createElement('div');
    row.classList.add('gallery-items-row', 'row');
    element.appendChild(row);
  }
}

function wrapItemInColumn(element, columns) {
  var columnClass = '';
  if (typeof columns === 'number') {
    columnClass = 'col-' + Math.ceil(12 / columns);
  } else if (typeof columns === 'object') {
    if (columns.xs) columnClass += ' col-' + Math.ceil(12 / columns.xs);
    if (columns.sm) columnClass += ' col-sm-' + Math.ceil(12 / columns.sm);
    if (columns.md) columnClass += ' col-md-' + Math.ceil(12 / columns.md);
    if (columns.lg) columnClass += ' col-lg-' + Math.ceil(12 / columns.lg);
    if (columns.xl) columnClass += ' col-xl-' + Math.ceil(12 / columns.xl);
  }

  // Vérifie si columnClass n'est pas vide avant d'ajouter les classes
  if (columnClass.trim() !== '') {
    var wrapper = document.createElement('div');
    wrapper.classList.add('item-column', 'mb-4');
    wrapper.classList.add(...columnClass.trim().split(/\s+/)); // Assure que les classes sont bien formées
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }
}

function moveItemInRowWrapper(element) {
  var rowWrapper = document.querySelector('.gallery-items-row');
  rowWrapper.appendChild(element);
}

function responsiveImageItem(element) {
  if (element.tagName === 'IMG') {
    element.classList.add('img-fluid');
  }
}

function openLightBox(element, lightboxId) {
  var lightboxImage = document.querySelector(`#${lightboxId} .lightboxImage`);
  lightboxImage.setAttribute('src', element.getAttribute('src'));
  var modal = new bootstrap.Modal(document.getElementById(lightboxId));
  modal.show();
}

function prevImage(lightboxId) {
  var activeImageSrc = document.querySelector(`#${lightboxId} .lightboxImage`).getAttribute('src');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var activeIndex = [...galleryItems].findIndex(item => item.getAttribute('src') === activeImageSrc);
  var newIndex = activeIndex > 0 ? activeIndex - 1 : galleryItems.length - 1;
  var newSrc = galleryItems[newIndex].getAttribute('src');
  document.querySelector(`#${lightboxId} .lightboxImage`).setAttribute('src', newSrc);
}

function nextImage(lightboxId) {
  var activeImageSrc = document.querySelector(`#${lightboxId} .lightboxImage`).getAttribute('src');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var activeIndex = [...galleryItems].findIndex(item => item.getAttribute('src') === activeImageSrc);
  var newIndex = (activeIndex + 1) % galleryItems.length;
  var newSrc = galleryItems[newIndex].getAttribute('src');
  document.querySelector(`#${lightboxId} .lightboxImage`).setAttribute('src', newSrc);
}

function createLightBox(gallery, lightboxId, navigation) {
  var modalHTML = `
    <div class="modal fade" id="${lightboxId}" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : ''}
            <img class="lightboxImage img-fluid" alt="Image de la galerie" />
            ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>' : ''}
          </div>
        </div>
      </div>
    </div>`;
  gallery.insertAdjacentHTML('beforeend', modalHTML);
}

function showItemTags(gallery, position, tags) {
  // Vérifie si la barre de filtres existe déjà
  if (!gallery.querySelector('.tags-bar')) {
    var tagItems = '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>';
    tags.forEach(function(tag) {
      tagItems += `<li class="nav-item"><span class="nav-link" data-images-toggle="${tag}">${tag}</span></li>`;
    });

    var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

    if (position === 'bottom') {
      gallery.insertAdjacentHTML('beforeend', tagsRow);
    } else if (position === 'top') {
      gallery.insertAdjacentHTML('afterbegin', tagsRow);
    }
  }
}

function filterByTag(tagElement) {
  var tag = tagElement.getAttribute('data-images-toggle');
  var activeTag = document.querySelector('.active-tag');
  activeTag.classList.remove('active', 'active-tag');
  tagElement.classList.add('active', 'active-tag');

  var galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function(item) {
    var itemColumn = item.closest('.item-column');
    if (tag === 'all') {
      itemColumn.style.display = 'block';
    } else {
      if (item.getAttribute('data-gallery-tag') === tag) {
        itemColumn.style.display = 'block';
      } else {
        itemColumn.style.display = 'none';
      }
    }
  });
}