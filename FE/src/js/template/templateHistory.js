export function templateHistoryMenu() {
  const historyMenu = `
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
            <i class="fas fa-times" data-type="history-close-btn"></i>
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
      </ul>
    </div>
    <!-- //menu -->
    `;
  return historyMenu;
}

export function templateHistoryFromTo({
  userId,
  action,
  cardContent,
  fromCategory,
  toCategory,
  modifiedTime,
}) {
  const actionFromTo = `
  <li class="activity-menu__activity">
    <div class="activity__action">
       <span class="action__author"><strong>@${userId}</strong></span> 
        <span>${action}</span>
        <span class="action__todo"><strong>${cardContent}</strong></span>
        <span>form <strong>${fromCategory}</strong> to <strong>${toCategory}<strong></span>
    </div>
    <div>
        <span class="activity__time">${modifiedTime}</span>
    </div>
  </li>
  `;
  return actionFromTo;
}

export function templateHistoryTo({
  userId,
  action,
  cardContent,
  toCategory,
  modifiedTime,
}) {
  const actionTo = `
  <li class="activity-menu__activity">
    <div class="activity__action">
      <span class="action__author"><strong>@${userId}</strong></span> 
         <span>${action}</span>
         <span class="action__todo"><strong>${cardContent}</strong></span>
         <span>to <strong>${toCategory}<strong></span>
      </div>
      <div>
          <span class="activity__time">${modifiedTime}</span>
      </div>
    </li>
  `;
  return actionTo;
}
