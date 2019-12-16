class Popup
{
  /**
   * 
   * @param {string} title The top title of the popup.
   * @param {string[] | HTMLElement[] | Function[]} content Array of content the popup should consist of. Any string will automatically become a ``<p>`` tag. 
   * @param {{"dieAfter": number, "noSpawn": boolean}} opt Optional settings for the popup.
   */
  constructor(title, content = [], opt = {})
  {
    if (!document.getElementById("ion_popupstyle")) {
      Popup.addStyle();
    }
    const object = document.createElement("div");
    object.className = "ion_popup";
    // Instance object.
    object.i = this;
    object.instance = this;
    object.setAttribute("state", "close");
    setTimeout(() => { object.setAttribute("state", "open"); }, 0);
    this.object = object;

    this.title = document.createElement("h2");
    this.title.innerText = title;
    this.title.className = "ion_title";
    this.content = document.createElement("div");
    this.content.className = "ion_content";

    for (let i = 0; i < content.length; i++) {
      var block = content[i];
      if (typeof block == "string") {
        var txt = block;
        block = document.createElement("p");
        block.innerText = txt;
      }
      if (typeof block == "function") {
        block = block();
      }
      this.content.append(block);
    }

    object.append(this.title);
    object.append(this.content);

    if (opt.noSpawn != true) {
      document.body.append(object);
    }

    // On fully spawned
    setTimeout(() => {
      this.object.style.minHeight = this.object.style.height;
      this.object.style.height = "auto";
    }, 300);

    // Opts
    if (typeof opt.dieAfter == "number") {
      setTimeout(() => {
        this.close();
      }, opt.dieAfter);
    }
  }

  /**
   * Add the styling for the popup objects.  
   * If this isn't run before the first use of the popup, it will be automatically added with default settings.
   */
  static addStyle() {
    const style = document.createElement("style");
    style.id = "ion_popupstyle";

    style.innerHTML = `
    div.ion_popup{
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      min-width: 20%;
      max-width: 50%;
      transition: height 0.3s ease-in-out;
      background-color: #1b1b1b;
      border-style: solid;
      border-color: white;
      overflow-y: auto;
    }

    div.ion_popup[state="close"]{
      height: 0px;
    }

    div.ion_popup[state="open"]{
      height: 256px;
    }

    div.ion_popup h2.ion_title{
      color: white;
      text-align: center;
    }

    div.ion_popup div.ion_content{
      color: white;
    }
    `;

    document.body.append(style);
  }

  /**
   * This will close the parent popup notification relative to a subelement.
   * @param {HTMLElement} element The sub element that belongs to a popup.
   */
  static closeFromSubElement(element)
  {
    try {
      while(element.className != "ion_popup"){
        element = element.parentNode;
      }
      element.i.close();
    } catch (error) {
      console.error("Could not find a parent popup.");
    }
  }

  close() {
    this.object.style.height = this.object.style.minHeight;
    this.object.style.minHeight = "0px";
    this.object.setAttribute("state", "close");
    setTimeout(() => {
      try {
        this.object.parentNode.removeChild(this.object);
      } catch {}
    }, 300);
  }

  open() {
    this.object.setAttribute("state", "close");
    document.body.append(this.object);
    this.object.setAttribute("state", "open");
  }
}

// Node JS support
try {
  exports.Popup = Popup;
} catch {}