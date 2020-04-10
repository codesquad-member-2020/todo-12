export function cardTpl(card, index) {
  if (index === 0)
    const card = `
    <ul class="column__cards">
            <li class="column__card flex">
                <div class="card__left flex">
                   <div class="card__contents">
                      <i class="far fa-calendar-check card__icon"></i>
                      <span class="card__content">할일내용</span>
                   </div>
                   <div class="card__btn">
                    <button type="button" class="close-btn">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div class="card__right">
                  <span class="card__author">Added by<strong> 작성자</strong></span>
                </div>
            </li>
          </ul>
          `;
  return card;
}
