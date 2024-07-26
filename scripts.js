/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = {
  "/": "/",
  reddit: "https://reddit.com/",
  maps: "https://maps.google.com/",
  yt: "https://youtube.com/",
  git: "https://github.com/",
  chatgpt: "https://chatgpt.com/",
  hyprland: "https://hyprland.org/",
};

const engine = "google";
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
};

const isWebUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getTargetUrl = (value) => {
  // Convert input value to lowercase
  const normalizedValue = value.toLowerCase();

  // Check if normalized value is a web URL
  if (isWebUrl(normalizedValue)) return normalizedValue;

  // Check lookup object with lowercase keys
  for (const key in lookup) {
    if (key.toLowerCase() === normalizedValue) {
      return lookup[key];
    }
  }

  // Default to search engine URL
  return engineUrls[engine] + value;
};

const search = () => {
  const value = searchInput.value;
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = (event) => event.key === "Enter" && search();
searchButton.onclick = search;

/**
 * inject bookmarks into html
 */
/** */
const bookmarks = [
  {
    label: "Social Media",
    bookmarks: [
      { label: "YouTube", url: "https://youtube.com" },
      {
        label: "Reddit",
        url: "https://reddit.com/",
      },
      { label: "Kick", url: "https://kick.com" },
      { label: "Twitch", url: "https://twitch.tv" },
    ],
  },
  {
    label: "Reddit",
    bookmarks: [
      { label: "UnixPorn", url: "https://reddit.com/r/unixporn" },
      { label: "ArchLinux", url: "https://www.reddit.com/r/archlinux/" },
      {
        label: "Trans",
        url: "https://reddit.com/r/trans",
      },
      {
        label: "Cats",
        url: "https://reddit.com/r/cats",
      },
    ],
  },
  {
    label: "Misc",
    bookmarks: [
      { label: "Proton Mail", url: "https://mail.proton.me/" },
      {
        label: "Github",
        url: "https://github.com/jade-gay",
      },
      { label: "Arch Linux", url: "https://archlinux.org/" },
      {
        label: "Hyprland Wiki",
        url: "https://hyprland.org/",
      },
    ],
  },
];

const createGroupContainer = () => {
  const container = document.createElement("div");
  container.className = "bookmark-group";
  return container;
};

const createGroupTitle = (title) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  return h2;
};

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.innerHTML = label;
  li.append(a);
  return li;
};

const createBookmarkList = (bookmarks) => {
  const ul = document.createElement("ul");
  bookmarks.map(createBookmark).forEach((li) => ul.append(li));
  return ul;
};

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer();
  const title = createGroupTitle(label);
  const bookmarkList = createBookmarkList(bookmarks);
  container.append(title);
  container.append(bookmarkList);
  return container;
};

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.append();
  bookmarks
    .map(createGroup)
    .forEach((group) => bookmarksContainer.append(group));
};

injectBookmarks();
