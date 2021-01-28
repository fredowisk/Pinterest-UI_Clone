const grids = document.querySelectorAll(".grid");
const columns = document.querySelectorAll(".grid .column");
const headings = document.querySelectorAll(".heading .wrapper .text");

async function enterScreen(index) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");

   if (index === 0) {
    reset();
  }

  grid.classList.add("active");

  gridColumns.forEach((element) => {
    element.classList.remove("animate-before", "animate-after");
  });

  heading.classList.remove("animate-before", "animate-after");
}

function reset() {
  columns.forEach((element) => {
    console.log(element.className);
    element.classList.add("animate-before");
    element.classList.remove("animate-after");
    console.log(element.className)
  });

  headings.forEach((element) => {
    element.classList.add("animate-before");
    element.classList.remove("animate-after");
  });
  return;
}

function exitScreen(index, exitDelay) {
  const grid = grids[index];
  const heading = headings[index];
  const gridColumns = grid.querySelectorAll(".column");

  gridColumns.forEach((element) => {
    element.classList.add("animate-after");
  });

  heading.classList.add("animate-after");

  setTimeout(() => {
    grid.classList.remove("active");
  }, exitDelay);
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
  const cycleTime = timePerScreen + exitDelay;
  let nextIndex = 0;

  function nextCycle() {
    const currentIndex = nextIndex;

    enterScreen(currentIndex);

    setTimeout(() => {
      exitScreen(currentIndex, exitDelay);
    }, timePerScreen);

    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
  }
  setInterval(nextCycle, cycleTime);

  nextCycle();
}

setupAnimationCycle({
  timePerScreen: 2000,
  exitDelay: 200 * 7,
});
