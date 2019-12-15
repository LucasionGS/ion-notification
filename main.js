class Popup
{
  /**
   * 
   * @param {string} title The top title of the popup.
   * @param {string[] | HTMLElement[]} content Array of content the popup should consist of. Any string will automatically become a ``<p>`` tag. 
   * @param {{"dieAfter": number}} opt Optional settings for the popup.
   */
  constructor(title, content, opt)
  {
    const object = document.createElement("div");
    object.className = "ion_popup";
    // Instance object.
    object.i = this;
    object.instance = this;
    object.setAttribute("state", "close");
    setTimeout(() => { object.setAttribute("state", "open"); }, 0);
    this.object = object;
  }

  static addStyle() {
    const style = document.createElement("style");
    style.id = "ion_popupstyle";

    style.innerHTML = `
    div.ion_popup{
      position: fixed;
      margin: auto;
      min-width: 20%;
      max-width: 50%;
      transition: height 0.3s ease-in-out;
      overflow-y: hidden;
    }

    div.ion_popup[state="close"]{
      height: 0px;
    }

    div.ion_popup[state="open"]{
      height: auto;
    }
    `;

    document.body.append(style);
  }
}

try {

} catch {}