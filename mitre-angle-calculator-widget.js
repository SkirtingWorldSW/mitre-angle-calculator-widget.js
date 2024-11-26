(function() {
  // Create a unique namespace to avoid conflicts
  var MitreCalculatorWidget = {};

  // Check if the container div exists
  var container = document.getElementById('mitre-angle-calculator-container');
  if (!container) {
    console.error('Mitre Angle Calculator: Container element with ID "mitre-angle-calculator-container" not found.');
    return;
  }

  // Define the calculator HTML
  var calculatorHTML = `
    <!-- Calculator HTML Starts -->
    <div id="mitre-angle-calculator" itemscope itemtype="https://schema.org/Calculator" style="text-align: center; font-family: Arial, sans-serif; display: flex; justify-content: center; padding: 10px; background-color: white;" role="form" aria-labelledby="calculator-title">
      <div style="text-align: left; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden; max-width: 500px; width: 100%; background: #f2f2f2; position: relative; padding-bottom: 70px;">
        <div style="padding: 20px;">
          <img src="https://yourwebsite.com/path-to-logo.png" alt="Your Logo" style="display: block; margin: 0 auto 20px; max-width: 150px;" itemprop="image">
          <div style="text-align: center;">
            <h2 id="calculator-title" style="font-size: 1.5em; color: #1B56C4; margin-bottom: 10px;" itemprop="name">Mitre Angle Calculator</h2>
            <p style="font-size: 1em; color: #666; margin-bottom: 20px;" itemprop="description">Calculate mitre angles for precise joint creation by entering your desired joint angle and board dimensions.</p>
          </div>
          <hr>
          <h3>Joint Details</h3>
          <div class="mitre-flex-container mitre-joint-details">
            <div style="display: flex; flex-direction: column; gap: 10px; flex: 1; max-width: 200px;">
              <label for="mitre-joint-angle" title="The angle of the joint you are creating." style="font-size: 1em; color: #333;">Joint Angle (degrees):</label>
              <input id="mitre-joint-angle" type="number" min="0" max="180" placeholder="e.g. 90" style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1em;" aria-required="true" aria-describedby="mitre-joint-angle-error">
            </div>
            <svg id="mitre-angleSvg" width="200" height="100" style="display: block; margin: 10px auto;" class="mitre-joint-angle-svg">
              <line id="mitre-baseLine" x1="150" y1="80" x2="100" y2="80" stroke="black" stroke-width="2"></line>
              <text id="mitre-angleText" x="140" y="70" fill="black" text-anchor="middle">0.00°</text>
              <line id="mitre-angle-line" x1="100" y1="80" x2="150" y2="80" stroke="red" stroke-width="2"></line>
            </svg>
          </div>
          <div id="mitre-joint-angle-error" class="mitre-error-message" style="margin-top: 5px;"></div>
          <hr>
          <h3>Board Dimensions</h3>
          <div class="mitre-input-box">
            <label for="mitre-board-a" title="The width of your first piece." style="font-size: 1em; color: #333;">Board A Width:</label>
            <div style="display: flex; margin-bottom: 20px;">
              <input id="mitre-board-a" type="number" min="0" placeholder="e.g. 350" style="flex: 3; padding: 10px; border: 1px solid #ccc; border-radius: 4px 0 0 4px; font-size: 1em;" aria-required="true">
              <select id="mitre-board-a-unit" style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 0 4px 4px 0; font-size: 1em;" aria-required="true">
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>
          <div class="mitre-input-box">
            <label for="mitre-board-b" title="The width of your second piece." style="font-size: 1em; color: #333;">Board B Width:</label>
            <div style="display: flex; margin-bottom: 20px;">
              <input id="mitre-board-b" type="number" min="0" placeholder="e.g. 350" style="flex: 3; padding: 10px; border: 1px solid #ccc; border-radius: 4px 0 0 4px; font-size: 1em;" aria-required="true">
              <select id="mitre-board-b-unit" style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 0 4px 4px 0; font-size: 1em;" aria-required="true">
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
                <option value="in">in</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>
          <hr>
          <h3>Mitre Angles</h3>
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
            <div id="mitre-angle-a-result" title="The angle for mitring the first piece." style="flex: 1; text-align: center;">
              <p><b>Board A Mitre Angle: <span id="mitre-angle-a">0.00</span>°</b></p>
              <svg width="200" height="100" style="margin:10px auto; display:block">
                <line x1="125" y1="80" x2="75" y2="80" stroke="black" stroke-width="2"></line>
                <path id="mitre-angleAPath" fill="none" stroke="red" stroke-width="2" d="M75,80 L125,80"></path>
                <text x="60" y="85" font-size="14" fill="black">A</text>
                <text id="mitre-angleAText" x="125" y="80" fill="black">0.00°</text>
              </svg>
            </div>
            <div id="mitre-angle-b-result" title="The angle for mitring the second piece." style="flex: 1; text-align: center;">
              <p><b>Board B Mitre Angle: <span id="mitre-angle-b">0.00</span>°</b></p>
              <svg width="200" height="100" style="margin:10px auto; display:block">
                <line x1="125" y1="80" x2="75" y2="80" stroke="black" stroke-width="2"></line>
                <path id="mitre-angleBPath" fill="none" stroke="red" stroke-width="2" d="M75,80 L125,80"></path>
                <text x="60" y="85" font-size="14" fill="black">B</text>
                <text id="mitre-angleBText" x="125" y="80" fill="black">0.00°</text>
              </svg>
            </div>
          </div>
        </div>
        <div class="mitre-mitre-saw-tab" id="mitre-mitre-saw-tab">
          <div class="mitre-mitre-saw-tab-label">Mitre Saw Settings <span class="mitre-click-icon">&#9660;</span></div>
          <div class="mitre-mitre-saw-content" id="mitre-mitre-saw-content">
            <p>Set your mitre saw to these angles:</p>
            <ul>
              <li>For Board A: <span id="mitre-mitre-angle-a">0.00</span>°</li>
              <li>For Board B: <span id="mitre-mitre-angle-b">0.00</span>°</li>
            </ul>
            <p class="mitre-note">Note: These settings assume your mitre saw measures angles from 90°.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Calculator HTML Ends -->
  `;

  // Insert the calculator HTML into the container
  container.innerHTML = calculatorHTML;

  // Define the calculator CSS
  var calculatorCSS = `
    /* Calculator CSS Starts */
    #mitre-angle-calculator * {
      box-sizing: border-box;
    }

    .mitre-tooltip {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .mitre-error-message {
      color: red;
    }

    .mitre-flex-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .mitre-joint-details {
      flex-direction: row;
    }

    .mitre-joint-angle-svg {
      flex: 1;
    }

    .mitre-input-box {
      margin-bottom: 20px;
      width: 100%;
    }

    .mitre-input-box > div {
      display: flex;
      align-items: stretch;
    }

    .mitre-input-box input[type="number"] {
      flex: 2;
      min-width: 0;
      padding: 10px;
      border: 1px solid #ccc;
      border-right: none;
      border-radius: 4px 0 0 4px;
      font-size: 16px;
    }

    .mitre-input-box select {
      flex: 1;
      max-width: 45%;
      min-width: 80px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 0 4px 4px 0;
      font-size: 16px;
      background-color: #f8f8f8;
    }

    @media (max-width: 600px) {
      #mitre-angle-calculator {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 0 auto;
      }

      .mitre-joint-details {
        flex-direction: column;
        align-items: center;
      }

      #mitre-angleSvg {
        margin: 10px auto;
        display: block;
      }

      .mitre-flex-container {
        flex-direction: column;
      }

      #mitre-angle-a-result,
      #mitre-angle-b-result {
        width: 100%;
        text-align: center;
        margin: 10px 0;
      }

      .mitre-input-box input[type="number"],
      .mitre-input-box select {
        font-size: 14px;
        padding: 8px;
      }

      .mitre-mitre-saw-tab {
        width: auto;
        height: 40px;
        position: absolute;
        right: 0;
        bottom: 0;
        border-radius: 8px 0 0 0;
        border-left: none;
      }

      .mitre-mitre-saw-content {
        width: auto;
        position: absolute;
        right: 0;
        bottom: 40px;
        border-radius: 8px 0 0 0;
      }
    }

    @media (max-width: 320px) {
      .mitre-input-box input[type="number"],
      .mitre-input-box select {
        font-size: 12px;
        padding: 6px;
      }
    }

    @media (min-width: 601px) {
      .mitre-flex-container {
        justify-content: space-between;
      }

      .mitre-input-box {
        width: auto;
      }

      #mitre-angle-a-result,
      #mitre-angle-b-result {
        width: 48%;
      }

      .mitre-joint-details input#mitre-joint-angle {
        width: 70%; 
      }
    }

    .mitre-mitre-saw-tab {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 200px; 
      height: 30px;
      background-color: #f2f2f2;
      cursor: pointer;
      border: 1px solid #ccc;
      border-bottom: none;
      border-right: none;
      border-radius: 8px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }

    .mitre-mitre-saw-tab:hover {
      background-color: #e0e0e0;
    }

    .mitre-mitre-saw-tab-label {
      font-size: 12px;
      color: black;
      display: flex;
      align-items: center;
    }

    .mitre-click-icon {
      margin-left: 5px;
      font-size: 14px;
      transition: transform 0.3s;
    }

    .mitre-mitre-saw-tab.open .mitre-click-icon {
      transform: rotate(180deg);
    }

    .mitre-mitre-saw-content {
      position: absolute;
      bottom: 30px;
      right: 0;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      border-right: none;
      border-radius: 8px 0 0 0;
      padding: 15px;
      width: 250px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: opacity 0.4s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
      z-index: 1000;
    }

    .mitre-mitre-saw-content.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .mitre-mitre-saw-content ul {
      list-style-type: none;
      padding: 0;
    }

    .mitre-mitre-saw-content li {
      margin-bottom: 10px;
    }

    .mitre-mitre-saw-content .mitre-note {
      font-size: 0.9em;
      color: #666;
      font-style: italic;
    }

    #mitre-angle-calculator > div {
      background-color: #f2f2f2;
      padding-bottom: 70px;
    }

    .mitre-mitre-saw-tab:hover {
      background-color: #e0e0e0;
    }

    .mitre-mitre-saw-tab {
      border-right: none;
    }

    .mitre-mitre-saw-content {
      border-right: none;
    }

    @media (max-width: 600px) {
      .mitre-mitre-saw-tab {
        width: auto;
        padding: 0 10px;
        height: 35px;
        position: absolute;
        right: 0;
        bottom: 0;
        border-radius: 8px 0 0 0;
      }

      .mitre-mitre-saw-content {
        width: auto;
        position: absolute;
        right: 0;
        bottom: 35px;
        border-radius: 8px 0 0 0;
      }
    }
    /* Calculator CSS Ends */
  `;

  // Insert the calculator CSS into the document
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(calculatorCSS));
  document.head.appendChild(style);

  // Include the calculator JavaScript functionality
  (function() {
    // All your calculator JavaScript code goes here
    // Adjusted to match the new IDs and class names
    const unitConversions = {
      'mm': 1,
      'cm': 10,
      'm': 1000,
      'in': 25.4,
      'ft': 304.8
    };

    function validateJointAngle() {
      const jointAngle = parseFloat(document.getElementById('mitre-joint-angle').value);
      const errorElement = document.getElementById('mitre-joint-angle-error');
      if (isNaN(jointAngle) || jointAngle < 0 || jointAngle > 180) {
        errorElement.textContent = "Joint angle must be between 0° and 180°.";
        updateJointAngleVisualization(0);
      } else {
        errorElement.textContent = "";
        updateJointAngleVisualization(jointAngle);
        updateCalculations();
      }
    }

    function validateBoardWidth() {
      updateCalculations();
    }

    function updateCalculations() {
      const jointAngle = parseFloat(document.getElementById('mitre-joint-angle').value) || 0;
      const boardAWidth = convertToMm('mitre-board-a') || 0;
      const boardBWidth = convertToMm('mitre-board-b') || 0;
      updateJointAngleVisualization(jointAngle);
      calculateMitreAngles(jointAngle, boardAWidth, boardBWidth);
      updateMitreSawSettings();
    }

    function convertToMm(id) {
      const width = parseFloat(document.getElementById(id).value);
      const unit = document.getElementById(`${id}-unit`).value;
      return isNaN(width) ? 0 : width * unitConversions[unit];
    }

    function calculateMitreAngles(jointAngle, boardAWidth, boardBWidth) {
      let angleA = calculateMitreAngle(jointAngle, boardAWidth, boardBWidth);
      let angleB = calculateMitreAngle(jointAngle, boardBWidth, boardAWidth);

      angleA = angleA < 0 ? angleA + 180 : angleA;
      angleB = angleB < 0 ? angleB + 180 : angleB;
      document.getElementById("mitre-angle-a").textContent = angleA.toFixed(2);
      document.getElementById("mitre-angle-b").textContent = angleB.toFixed(2);
      updateAngleVisualizationForResults('mitre-angleAPath', angleA, 'A');
      updateAngleVisualizationForResults('mitre-angleBPath', angleB, 'B');
    }

    function calculateMitreAngle(jointAngle, boardWidth1, boardWidth2) {
      if (boardWidth1 === 0 || boardWidth2 === 0) {
        return 0;
      }
      return Math.atan(boardWidth1 * Math.sin(jointAngle * Math.PI / 180) / (boardWidth2 + boardWidth1 * Math.cos(jointAngle * Math.PI / 180))) * 180 / Math.PI;
    }

    function updateAngleVisualizationForResults(pathId, angle, label) {
      const anglePath = document.getElementById(pathId);
      const baseX = 75;
      const baseY = 80;
      const lineLength = 50;
      const radians = angle * Math.PI / 180;
      const endX = baseX + lineLength * Math.cos(radians);
      const endY = baseY - lineLength * Math.sin(radians);
      anglePath.setAttribute("d", `M${baseX},${baseY} L${endX},${endY}`);
      const angleText = document.getElementById(label === 'A' ? 'mitre-angleAText' : 'mitre-angleBText');
      angleText.textContent = `${angle.toFixed(2)}°`;
      angleText.setAttribute("x", endX + 5);
      angleText.setAttribute("y", endY < baseY ? endY - 5 : endY + 15);
    }

    function updateJointAngleVisualization(angle) {
      const svg = document.getElementById("mitre-angleSvg");
      let angleLine = svg.querySelector("#mitre-angle-line");
      if (!angleLine) {
        angleLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        angleLine.setAttribute("id", "mitre-angle-line");
        svg.appendChild(angleLine);
      }
      const scale = window.innerWidth <= 600 ? 1 : 1.5;
      svg.style.transform = `scale(${scale})`;
      const baseX = 100;
      const baseY = 80;
      const lineLength = 50;
      const radians = (angle * Math.PI) / 180;
      const endX = baseX + lineLength * Math.cos(radians);
      const endY = baseY - lineLength * Math.sin(radians);
      angleLine.setAttribute("x1", baseX);
      angleLine.setAttribute("y1", baseY);
      angleLine.setAttribute("x2", endX);
      angleLine.setAttribute("y2", endY);
      angleLine.setAttribute("stroke", "red");
      angleLine.setAttribute("stroke-width", "2");
      const angleText = document.getElementById("mitre-angleText");
      angleText.textContent = `${angle.toFixed(2)}°`;
      angleText.setAttribute("x", endX - 10);
      angleText.setAttribute("y", endY - 10);
      angleText.setAttribute("text-anchor", "middle");
    }

    function updateMitreSawSettings() {
      const angleA = parseFloat(document.getElementById("mitre-angle-a").textContent) || 0;
      const angleB = parseFloat(document.getElementById("mitre-angle-b").textContent) || 0;

      const mitreAngleA = Math.abs(90 - angleA).toFixed(2);
      const mitreAngleB = Math.abs(90 - angleB).toFixed(2);

      document.getElementById("mitre-mitre-angle-a").textContent = mitreAngleA;
      document.getElementById("mitre-mitre-angle-b").textContent = mitreAngleB;
    }

    // Event listeners
    document.getElementById('mitre-joint-angle').addEventListener('input', validateJointAngle);
    document.getElementById('mitre-board-a').addEventListener('input', validateBoardWidth);
    document.getElementById('mitre-board-a-unit').addEventListener('change', validateBoardWidth);
    document.getElementById('mitre-board-b').addEventListener('input', validateBoardWidth);
    document.getElementById('mitre-board-b-unit').addEventListener('change', validateBoardWidth);

    document.getElementById('mitre-mitre-saw-tab').addEventListener('click', function(event) {
      const content = document.getElementById('mitre-mitre-saw-content');
      content.classList.toggle('open');
      this.classList.toggle('open');
      event.stopPropagation(); 
    });

    document.addEventListener('click', function(event) {
      const content = document.getElementById('mitre-mitre-saw-content');
      const tab = document.getElementById('mitre-mitre-saw-tab');

      if (!content.contains(event.target) && !tab.contains(event.target)) {
        content.classList.remove('open');
        tab.classList.remove('open');
      }
    });

    // Initialize calculations
    updateCalculations();

  })();

})();
