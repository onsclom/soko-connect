const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const gridDim = 16;

const level = `
################
################
################
################
######## gg#####
#######  g #####
#####    g #####
##### c    #####
##### #  c #####
##### c    #####
#####     p#####
################
################
################
################
################
`
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

/*
levels include:
#, g, c, p
# = wall
g = goal
c = combiner
p = player
" " = ground
*/
(function raf() {
  const canvasRect = canvas.getBoundingClientRect();
  canvas.width = canvasRect.width * devicePixelRatio;
  canvas.height = canvasRect.height * devicePixelRatio;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2d context");
  ctx.scale(devicePixelRatio, devicePixelRatio);

  // letterboxed 1:1 square
  const margin = 10;
  const letterBoxedSize = Math.min(canvasRect.width, canvasRect.height);
  const letterBoxedRect = {
    x: (canvasRect.width - letterBoxedSize) / 2 + margin,
    y: (canvasRect.height - letterBoxedSize) / 2 + margin,
    width: letterBoxedSize - margin * 2,
    height: letterBoxedSize - margin * 2,
  };

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const y of Array(gridDim).keys()) {
    for (const x of Array(gridDim).keys()) {
      const cellWidth = letterBoxedRect.width / gridDim;
      const cellHeight = letterBoxedRect.height / gridDim;
      const cellRect = {
        x: letterBoxedRect.x + x * cellWidth,
        y: letterBoxedRect.y + y * cellHeight,
        width: cellWidth,
        height: cellHeight,
      };

      const partToColor: Record<string, string> = {
        "#": "black",
        g: "red",
        c: "yellow",
        p: "blue",
        " ": "gray",
      };
      const part = level[y][x];
      ctx.fillStyle = part in partToColor ? partToColor[part] : "purple";
      ctx.fillRect(cellRect.x, cellRect.y, cellRect.width, cellRect.height);

      ctx.strokeStyle = "white";
      ctx.strokeRect(cellRect.x, cellRect.y, cellRect.width, cellRect.height);
    }
  }

  requestAnimationFrame(raf);
})();
