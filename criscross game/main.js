
    const boxes = Array.from(document.querySelectorAll(".box"));
    const resetBtn = document.getElementById("resetBtn");
    const status = document.getElementById("status");

    let turnO = true;
    let gameOver = false;

    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function updateStatus(text) {
      status.innerText = text;
    }

    function checkWinner() {
      for (const pattern of winPatterns) {
        const [i, j, k] = pattern;
        const a = boxes[i].innerText;
        const b = boxes[j].innerText;
        const c = boxes[k].innerText;
        if (a !== "" && a === b && b === c) {
          updateStatus(`${a} Wins 🎉`);
          gameOver = true;
          disableAll();
          return true;
        }
      }

      const allFilled = boxes.every(b => b.innerText !== "");
      if (allFilled) {
        updateStatus("It's a Draw 🤝");
        gameOver = true;
        return false;
      }

      updateStatus(`Turn: ${turnO ? "O" : "X"}`);
      return false;
    }

    function disableAll() {
      boxes.forEach(box => box.disabled = true);
    }

    function handleBoxClick(e) {
      const box = e.currentTarget;
      if (gameOver) return;
      if (box.innerText !== "") return;

      box.innerText = turnO ? "O" : "X";

      checkWinner();

      if (!gameOver) turnO = !turnO;
      updateStatus(`Turn: ${turnO ? "O" : "X"}`);
    }

    boxes.forEach(box => {
      box.addEventListener("click", handleBoxClick);
    });

    resetBtn.addEventListener("click", () => {
      boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
      });
      turnO = true;
      gameOver = false;
      updateStatus("Turn: O");
    });

    updateStatus("Turn: O");
