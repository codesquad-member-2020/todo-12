export function tplCard({ id, content, author }) {
  const card = `
            <li class="column__card flex" id="card-data-id-${id}">
                <div class="card__left flex">
                   <div class="card__contents">
                      <i class="far fa-calendar-check card__icon"></i>
                      <span class="card__content">${content}</span>
                   </div>
                   <div class="card__btn">
                    <button type="button" class="close-btn">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div class="card__right">
                  <span class="card__author">Added by <strong>${author}</strong></span>
                </div>
            </li>
          `;
  return card;
}
