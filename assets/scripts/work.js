function onJobLinkClick(e){
  const link = e.target.dataset.card;
  const card = document.querySelector(`.job[data-card=${link}]`);

  if(card){
    document.querySelector('body').style.overflow = 'hidden';
    card.classList.add(`job--active`);
    e.preventDefault();
    return false;
  }
}

function onJobClick(e){
  const activeCard = document.querySelector('.job.job--active');

  if(activeCard){
    activeCard.classList.remove('job--active');
    document.querySelector('body').style.overflow = 'auto';
  }
}

const links = document.querySelectorAll('.work-wrapper--link');
links.forEach(link => link.addEventListener('click', onJobLinkClick));

const jobs = document.querySelectorAll('.job');
jobs.forEach(job => job.addEventListener('click', onJobClick));
