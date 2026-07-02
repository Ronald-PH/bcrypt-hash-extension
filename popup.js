(function () {
  const bcryptApi = window.bcrypt;

  const plainText = document.getElementById("plainText");
  const rounds = document.getElementById("rounds");
  const roundsValue = document.getElementById("roundsValue");
  const hashButton = document.getElementById("hashButton");
  const hashOutput = document.getElementById("hashOutput");
  const copyHashButton = document.getElementById("copyHashButton");
  const verifyText = document.getElementById("verifyText");
  const verifyHash = document.getElementById("verifyHash");
  const verifyButton = document.getElementById("verifyButton");
  const verifyResult = document.getElementById("verifyResult");
  const message = document.getElementById("message");

  function setBusy(button, isBusy, label) {
    button.disabled = isBusy;
    button.textContent = isBusy ? "Working..." : label;
  }

  function showMessage(text) {
    message.textContent = text;
  }

  function setVerifyResult(text, className) {
    verifyResult.className = `result ${className || ""}`.trim();
    verifyResult.textContent = text;
  }

  function validateBcrypt() {
    if (!bcryptApi) {
      showMessage("Bcrypt failed to load.");
      hashButton.disabled = true;
      verifyButton.disabled = true;
      return false;
    }
    return true;
  }

  rounds.addEventListener("input", function () {
    roundsValue.value = rounds.value;
    roundsValue.textContent = rounds.value;
  });

  hashButton.addEventListener("click", function () {
    if (!validateBcrypt()) return;

    const text = plainText.value;
    if (!text) {
      showMessage("Enter text before generating a hash.");
      plainText.focus();
      return;
    }

    showMessage("");
    setBusy(hashButton, true, "Generate Hash");

    setTimeout(function () {
      try {
        const salt = bcryptApi.genSaltSync(Number(rounds.value));
        hashOutput.value = bcryptApi.hashSync(text, salt);
        verifyText.value = text;
        verifyHash.value = hashOutput.value;
        setVerifyResult("", "");
        showMessage("Hash generated.");
      } catch (error) {
        showMessage(error.message || "Could not generate hash.");
      } finally {
        setBusy(hashButton, false, "Generate Hash");
      }
    }, 20);
  });

  copyHashButton.addEventListener("click", async function () {
    if (!hashOutput.value) {
      showMessage("Generate a hash first.");
      return;
    }

    try {
      await navigator.clipboard.writeText(hashOutput.value);
      showMessage("Hash copied.");
    } catch (error) {
      hashOutput.select();
      document.execCommand("copy");
      showMessage("Hash copied.");
    }
  });

  verifyButton.addEventListener("click", function () {
    if (!validateBcrypt()) return;

    if (!verifyText.value || !verifyHash.value) {
      setVerifyResult("Enter both text and a bcrypt hash.", "error");
      return;
    }

    showMessage("");
    setBusy(verifyButton, true, "Verify Match");

    setTimeout(function () {
      try {
        const matches = bcryptApi.compareSync(verifyText.value, verifyHash.value.trim());
        setVerifyResult(matches ? "Match" : "No match", matches ? "match" : "no-match");
      } catch (error) {
        setVerifyResult("Invalid bcrypt hash.", "error");
      } finally {
        setBusy(verifyButton, false, "Verify Match");
      }
    }, 20);
  });

  validateBcrypt();
})();
