export function templateHistory() {
  const history = `
    <!-- menu -->
    <div id="activity-menu">
      <h2 class="blind">활동 메뉴</h2>
      <div class="activity-menu__header flex">
        <div class="activity-menu__column">
          <i class="fas fa-bars"></i>
          <span>Menu</span>
        </div>
        <div class="activity-menuu__column">
          <button type="button" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="activity-menu__header flex">
        <div class="activity-menu__bell">
        <i class="fas fa-bell"></i>
        <span>Activity</span>
      </div>
      </div>
      <ul class="activity-menu__list">
        <li class="activity-menu__activity">
          <div class="activity__action">
            <span class="action__author"><strong>ellin</strong></span> 
            <span>meved</span>
            <span class="action__todo"><strong>공부하기</strong></span>
            <span>form <strong>To do</strong> to<strong> 하는중<strong></span>
          </div>
          <div>
            <span class="activity__time">1 minute ago</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- //menu -->
    `;
  return history;
}
