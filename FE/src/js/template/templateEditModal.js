export function templateEditModal() {
  const editModal = `
    <!--Edit card popup -->
    <div id="popup__todo">
      <div class="popup__shadow">그림자</div>
      <div class="popup__container">
        <div class="popup__header flex">
          <h3 class="popup__title">Edit note</h3>
          <div class="popup__close">
            <button type="button" class="close-btn"><i class="fas fa-times" data-type="edit-close-btn"></i></button>
          </div>
        </div>
        <div class="popup__contents">
          <h4 class="popup__note">Note</h4>
          <div class="input-box">
            <textarea name="content" maxlength="100" data-type="popup__input" class="popup__input" aria-label="수정할 내용을 입력하세요" placeholder="Enter a note"></textarea>
          </div>
          <div>
            <button type="button" class="btn__green edit-save-btn" data-type="edit-save-btn">save note</button>
          </div>
        </div>
      </div>
    </div>
       <!--//Edit card popup -->
       `;
  return editModal;
}
