"use strict";

function buildProductLine(type) {
  const link = document.querySelector(".product-line");
  link.innerHTML = "";

  for (const i in products)
    if (products[i].type == type) link.innerHTML += products[i].setHTMLText();
}

function headPhone() {
  buildProductLine("headPhone");
}
function cellPhone() {
  buildProductLine("cellPhone");
}

function monitor() {
  buildProductLine("monitor");
}
function laptop() {
  buildProductLine("laptop");
}

// alert("headphone");

class product {
  constructor(id, type, manufacture, text, image, price, fullText) {
    this.id = id;
    this.type = type;
    this.manufacture = manufacture;
    this.text = text;
    this.image = image;
    this.price = price;
    this.fullText = fullText;
  }
  getDetails() {
    console.log(
      `type: ${this.type}, manufacture: ${this.manufacture}, , text: ${this.text} , image: ${this.image} , price: ${this.price}, fullText: ${this.fullText}`
    );
  }
  setHTMLText() {
    const txt = ` 
    <div class="card card-r" style="width: 18rem"> 
    <img src="${this.image}" class="card-img-top"  alt="laptop"  /> 
    <div class="card-body">
            <h5 class="card-title">${this.manufacture}</h5>
            <p class="card-text">
              ${this.text}
            </p>
            
          </div>

<div
      class="modal fade"
      id="ModalToggle${this.id}"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title title5" id="exampleModalToggleLabel">${this.type}-${this.manufacture}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">${this.fullText}</div>
          <h4 class="modal-title title4" id="exampleModalToggleLabel">Price - $${this.price}  </h4>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              data-bs-target="#exampleModalToggle2"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>



        <div class="d-grid gap-2">
            <button class="btn btn-primary" data-bs-toggle="modal" type="button" href="#ModalToggle${this.id}" >More Info</button>
            
          </div>  
        </div>
        
        </div>`;

    return txt;
  }
}

function moreInfo() {
  console.log(this);
}

let products = [];

function Init() {
  products.push(
    new product(
      1,
      "monitor",
      "PHILIPS   ",
      "PHILIPS 22 inch Class Thin Full HD (1920 x 1080) Monitor, 100Hz Refresh Rate",
      "./images/monitor1.jpg",
      69,
      `About this item
CRISP CLARITY: This 22 inch class (21.5″ viewable) Philips V line monitor delivers crisp Full HD 1920x1080 visuals. Enjoy movies, shows and videos with remarkable detail
100HZ FAST REFRESH RATE: 100Hz brings your favorite movies and video games to life. Stream, binge, and play effortlessly
SMOOTH ACTION WITH ADAPTIVE-SYNC: Adaptive-Sync technology ensures fluid action sequences and rapid response time. Every frame will be rendered smoothly with crystal clarity and without stutter
INCREDIBLE CONTRAST: The VA panel produces brighter whites and deeper blacks. You get true-to-life images and more gradients with 16.7 million colors
THE PERFECT VIEW: The 178/178 degree extra wide viewing angle prevents the shifting of colors when viewed from an offset angle, so you always get consistent colors`
    )
  );

  products.push(
    new product(
      2,
      "monitor",
      "SAMSUNG  ",
      `SAMSUNG 27" T35F Series FHD 1080p Computer Monitor, 75Hz, IPS Panel`,
      "./images/monitor2.jpg",
      118,
      `About this item
ALL-EXPANSIVE VIEW: The 3-sided borderless display brings a clean and modern aesthetic to any working environment. In a multi-monitor setup, the displays line up seamlessly for a virtually gapless view without distractions.Aspect ratio:16:9.Response time:5.0 milliseconds
IPS PANEL: Sit anywhere and have a full technicolor experience. The IPS panel preserves color vividness and clarity across every inch of the screen. Even on a display this wide, tones and shades look completely accurate from virtually any angle, with no color washing
SYNCHRONIZED ACTION: Superfluid entertainment experience. AMD Radeon FreeSync keeps your monitor and graphics card refresh rate in sync to reduce image tearing. Watch movies and play games without any interruptions. Even fast scenes look seamless and smooth
SEAMLESS, SMOOTH VISUALS: Now, the picture looks flawless. The 75Hz refresh rate delivers more fluid scenes. Whether you're catching up on your favorite TV drama, watching a video, or playing a game, your entertainment has no lag or ghosting effect
MORE GAMING POWER: Ideal game settings instantly give you the edge. Get optimal color and image contrast to see scenes more vividly and spot enemies hiding in the dark. Game Mode adjusts any game to fill your screen with every detail in view
SUPERIOR EYE CARE: Advanced eye comfort technology reduces eye strain for less strenuous extended computing; Flicker Free technology continuously removes tiring and irritating screen flicker, while Eye Saver Mode minimizes emitted blue light
TRUE VERSATILITY: With both HDMI and D-sub ports, multiple devices can be plugged straight into your monitor for complete flexibility; Now, your computing environment is even more convenient with additional input possibilities`
    )
  );
  products.push(
    new product(
      3,
      "cellPhone",
      "Google   ",
      "Sony WH-1000XM4 Wireless Premium Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Midnight Blue WH1000XM4",
      "./images/cell2.jpg",
      600,
      `About this item
Pixel 8 is the helpful phone engineered by Google; the new Google Tensor G3 chip is custom-designed with Google AI for cutting-edge photo and video features and smarter ways to help[1]
Unlocked Android 5G phone gives you the flexibility to change carriers and choose your own data plan[2]; it works with Google Fi, Verizon, T-Mobile, AT&T, and other major carriers
Google Pixel 8 has a fully upgraded camera with advanced image processing to reveal vivid colors and striking details; and now with Macro Focus, even the smallest subjects can become spectacular images
The 6.2-inch Pixel 8 Actua display is super sharp, with rich, vivid colors; it’s fast and responsive for smoother gaming, scrolling, and moving between apps[3,4]
Pixel’s Adaptive Battery can last over 24 hours; when Extreme Battery Saver is turned on, it can last up to 72 hours[5]; and it charges faster than ever[6]
Pixel 8 can notify first responders in an emergency and share your location, and can even detect if you’ve been in a severe car crash[7,8]; if you’re unable to respond, your Pixel phone can call emergency services and notify your chosen contacts
With powerful security features, your Pixel phone helps keep your info safe; Google Tensor G3, VPN by Google One, and the Titan M2 security chip give your Pixel multiple layers of security[9]`
    )
  );
  products.push(
    new product(
      4,
      "cellPhone",
      "OnePlus   ",
      "Sony WH-1000XM4 Wireless Premium Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Midnight Blue WH1000XM4",
      "./images/cell3.jpg",
      550,
      `About this item
108MP Triple Camera with 3x Lossless Zoom and Electronic Image Stabilisation (EIS) - titanic main camera that captures clear, high-detail photos with 9-in-1 pixel binning tech that absorbs more light for brighter, more colorful images.
Qualcomm Snapdragon 695 Chipset - With up to 8GB of expandable virtual RAM that will have you swiping and switching between apps at blistering speed.
50W SUPERVOOC Endurance Edition + 5,000 mAh Battery - A day's power in just 30 minutes. SUPERVOOC Endurance Edition charging and Battery Health Engine technology increase the battery's lifespan and prevent over-charging.
6.7” 120 Hz Display + Dual Stereo Speakers - Lose yourself in your favorite movies and shows with a massive LCD display and a speedy 120 Hz adaptive refresh rate that saves on battery + 200% Ultra Volume Mode to tune into the dual stereo speakers.
OxygenOS 13.1 - Fast and Smooth experience and incredible features including Quick Start and Gaming Tools, with Game Focus Mode and improved app optimisation.
5G Enabled Dual-SIM - The OnePlus Nord N30 is the perfect entry-level 5G phone, featuring premium specs and an affordable price. *5G compatible with T-mobile, Google Fi, Mint Mobile, Metro by TMO, Simple Mobile. 5G available in selected areas, please check with your carrier. (Dual-SIM is SIM & SIM/MicroSD)`
    )
  );

  products.push(
    new product(
      5,
      "headPhone",
      "Sony ",
      "Sony WH-1000XM4 Wireless Premium Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Midnight Blue WH1000XM4",
      "./images/headphone1.jpg",
      212,
      `About this item
ACTIVE NOISE CANCELLATION: Premium noise canceling with Dual Noise Sensor technology
LONG BATTERY LIFE: Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback)
TOUCH SENSOR CONTROLS: Pause play skip tracks, control volume, activate your voice assistant, and answer phone calls.
SPEAK-TO-CHAT: Automatically reduces volume during conversations
SUPERIOR CALL QUALITY: Precise voice pick up combines five built-in microphones with advanced audio signal for clear calls
WEARING DETECTION: Pauses playback when headphones are removed
MULTIPOINT CONNECTION: Seamless multiple-device pairing`
    )
  );
  products.push(
    new product(
      6,
      "headPhone",
      "Sony ",
      "Sony WH-CH520 Wireless Headphones Bluetooth On-Ear Headset with Microphone, Black New",
      "./images/headphone2.jpg",
      50,
      `About this item
LONG BATTERY LIFE: With up to 50-hour battery life and quick charging, you’ll have enough power for multi-day road trips and long festival weekends.
HIGH QUALITY SOUND: Great sound quality customizable to your music preference with EQ Custom on the Sony | Headphones Connect App.
LIGHT & COMFORTABLE: The lightweight build and swivel earcups gently slip on and off, while the adjustable headband, cushion and soft ear pads give you all-day comfort.
CRYSTAL CLEAR CALLS: A built-in microphone provides you with hands-free calling. No need to even take your phone from your pocket.
MULTIPOINT CONNECTION: Quickly switch between two devices at once.
AVAILABLE IN FOUR COLORS: With Black, Blue, White, and Cappuccino to choose from, find the color that suits you best.
GIVE YOUR MUSIC A BOOST: Boost the quality of compressed music files and enjoy streaming music with high quality sound through DSEE.`
    )
  );
  products.push(
    new product(
      7,
      "headPhone",
      "JBL  ",
      "JBL TUNE 770NC - Adaptive Noise Cancelling with Smart Ambient Wireless Over-Ear Headphones, Bluetooth 5.3",
      "./images/headphone3.jpg",
      50,
      `About this item
Adaptive Noise Cancelling with Smart Ambient: Adaptive Noise Cancelling means zero distractions whether you’re studying or getting lost in the music. If you want to hear the world around you, activate Ambient Aware and TalkThru in the JBL Headphones app.
Bluetooth 5.3 with LE Audio: Wirelessly stream high-quality JBL Pure Bass Sound. In the JBL Headphones app select Audio mode for the best sound quality or Video Mode to ensure the sound and visuals of your movie/game are in sync. *Available via OTA update
JBL Pure Bass Sound: JBL Tune 770NC headphones feature renowned JBL Pure Bass sound—the same that powers the most famous music venues all around the world.
Customize your listening experience: Download the free JBL Headphones App to tailor the sound to your taste by choosing one of the pre-set EQ modes or adjusting the EQ curve according to your content, your style, your taste.
Hands-free calls with VoiceAware: Easily control your sound and manage your calls from your headphones with the convenient buttons on the ear-cup. Hear your voice while you're talking, with the help of VoiceAware.`
    )
  );
  products.push(
    new product(
      8,
      "headPhone",
      "Skullcandy  ",
      "Skullcandy Riff On-Ear Wired Headphones, Microphone, Works with Bluetooth Devices and Computers",
      "./images/headphone1.jpg",
      50,
      `About this item
Refined acoustics - Riff is engineered to deliver exceptional sound quality at an affordable price.
Microphone with call and track control - Riff lets you manage calls and tracks with buttons on the ear cups.
Comfortability at its finest - Riff's light-weight, ultra durable headband and plush on-ear cushions delivers unparalleled comfort.
Travel-ready - A collapsible, flat-folding design makes the Riff easy to pack and use anywhere on-the-go.
Buy with Confidence - 1 year US warranty included.`
    )
  );

  products.push(
    new product(
      9,
      "laptop",
      "Lenovo",
      "Lenovo 2023 Newest Upgraded Laptops, 15.6 inch HD Computer, AMD Athlon Silver 7120U Quad-Core, 4GB RAM, 256GB",
      "./images/Lenovo1.jpg",
      279,
      `About this item
PROCESSOR: Equipped with Intel Pentium Silver N6000 quad-core Processor, which is the perfect laptop for your everyday tasks with features that you can depend on.
RAM and STORAGE: 40GB high-bandwidth RAM to smoothly run multiple applications and browser tabs all at once. 1TB PCIe Solid State Drive allows to fast bootup and data transfer.
DISPLAY: Enjoy the 15.6" Full HD Anti-glare display, offering crisp and clear visuals, perfect for both work and entertainment.
KEY FEATURES: Stay connected with multiple ports including ethernet port(RJ-45) HDMI, USB-C, webcam, facilitating easy connection to various peripherals and networks.
OPERATING SYSTEMS: Windows 11 Home`
    )
  );
  products.push(
    new product(
      10,
      "laptop",
      "Lenovo",
      "Lenovo IdeaPad 1 Laptop, 15.6” FHD Display, AMD Ryzen 5 5500U, 8GB RAM, 512GB SS",
      "./images/Lenovo2.jpg",
      359,
      `About this item
【High-Performance Configuration】 Driven by the AMD Ryzen 3 7320U processor, with 4 cores and 8 threads, delivering clock speeds from 2.4GHz to 4.1GHz. Experience responsive performance for work and entertainment.
【Immersive Visuals with Radeon Graphics】 Integrated AMD Radeon 610M Graphics ensure stunning visuals for your 15.6" FHD display. Enjoy vibrant and detailed graphics for an enhanced viewing experience.
【Efficient Memory and Swift Storage】 Enjoy seamless multitasking with 16GB DDR5-5500 memory, supporting dual-channel capabilities. Paired with a 1TB SSD M.2 2242 PCIe 4.0x4 NVMe, experience rapid data access and system responsiveness, ensuring a smooth computing experience.
【Built for Durability and Security】 This laptop is engineered for resilience, having passed the rigorous MIL-STD-810H military testing standards, which ensures it can handle extreme conditions, shocks, and vibrations, making it ideal for use in challenging environments. Additionally, it features a firmware TPM 2.0 for enhanced security and is encased in a stylish and durable Arctic Grey PC-ABS chassis.
【Exclusive Gift Inside】 Find your special voucher inside due to package size constraints. Contact us to claim your free exclusive gift!`
    )
  );

  products.push(
    new product(
      11,
      "laptop",
      "Lenovo",
      'LENOVO IdeaPad 3i Laptop, 15.6" HD Touchscreen Display, Intel Core i3-1115G4 Processor, 12GB DDR4 RAM, 256GB PCIe SSD',
      "./images/Lenovo3.jpg",
      349,
      `About this item
【Memory & Storage】Memory is 12GB high-bandwidth RAM to smoothly run multiple applications and browser tabs all at once. Hard Drive is 512GB PCIe NVMe M.2 Solid State Drive which allows to fast bootup and data transfer
【Processor】 Intel Core i3-1115G4 3.00 GHz 2 Cores Processor (6MB Cache, up to 4.10 GHz), Intel UHD Graphics
【Screen】15.6" HD TouchScreen (1366 x 768) Display
【Ports】2 x SuperSpeed USB Type-A 3.2, 1 x SuperSpeed USB Type-A, 1 x HDMI, 1 x Headphone/Microphone Combo, 1 x SD Card Reader, Wireless-AC (Wi-Fi 5) and Bluetooth Combo
【Operating System】Windows 11 Home, 64 bit`
    )
  );
  products.push(
    new product(
      12,
      "laptop",
      "Lenovo",
      "Lenovo Newest Flagship Chromebook, 14'' FHD Touchscreen Slim Thin Light Laptop Computer, 8-Core MediaTek Kompanio",
      "./images/Lenovo4.jpg",
      233,
      `About this item
🥇 【4GB DDR4 + 128GB Storage (64GB eMMC+64GB Card)】Sufficient high-bandwidth 4GB RAM allows you to smoothly run your programs and browser tabs all at once. 64GB eMMC flash memory: This ultracompact memory system is ideal for mobile devices and applications, providing enhanced storage capabilities, streamlined data management, quick boot-up times and support for high-definition video playback. Plus 64GB high-speed memory card for your office and webinar needs
🥇【14.0" HD Display】14" diagonal, typical 1366 x 768 HD resolution. Energy-efficient LED backlight. Built-in webcam with Privacy Shutter and dual array microphone. MarxsolAccessories including HDMI Cable, USB extension cord and Mouse Pad for Home, Student, Professionals, Small Business, School Education, and Commercial Enterprise. Online Class, Google Classroom, Remote Learning, Zoom Ready
🥇【Dual Core Intel Celeron N4020】Intel Celeron N4020 (Base Frequency 1.1GHz, Max Turbo Frequency Up to 2.8GHz, 4MB L3 Cache, 2 Cores, 2 Threads). Featuring true machine intelligence and a newly designed efficient architecture, the groundbreaking processor learns and adapts to your needs so you can achieve more
🥇【Windows 11 Home in S Mode】Experience the most secure Windows ever built with fast boot times, increased responsiveness, and added protection against phishing and malware. (You can EASILY switch to regular Windows 11 Home: Open Microsoft Store > search and select "Switch out of S Mode" > select "Get")
🥇【Authorized w/MarxsolBundle】12.81" L x 8.52" W x 0.7" H, 3.08 lbs; 1 x USB 3.2 Type-C / 1 x USB 3.2 Type-A / 1 x USB 2.0 Type-A / HDMI 1.4 / 1 x headphone/microphone combo; WiFi 6 - 802.11 ax and Bluetooth combo; Integrated 720p Webcam; Cloud Grey +MarxsolAccessory includes 64GB Memory Card & 6-in-1 USB-C Docking Station Hub with USB 3.0, 4K-HDMI, USB C Connection, SD/TF Card Reade and HDMI & USB Cable, Mouse Pad and Wireless Mouse.`
    )
  );
  // products.push(new product('laptop','Lenovo','',''))
}

Init();

console.log(products);
