/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = {
  "/": "/",
  deepl: "https://deepl.com/",
  reddit: "https://reddit.com/",
  maps: "https://maps.google.com/",
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
  if (isWebUrl(value)) return value;
  if (lookup[value]) return lookup[value];
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
      { label: "Tiktok", url: "https://tiktok.com" },
      { label: "Discord", url: "https://discord.com/" },
    ],
  },
  {
    label: "Reddit",
    bookmarks: [
      { label: "UnixPorn", url: "https://reddit.com/r/unixporn" },
      { label: "Pop!_OS", url: "https://reddit.com/r/pop_os" },
      {
        label: "MercyMains",
        url: "https://reddit.com/r/mercymains",
      },
      {
        label: "HypixelSkyblock",
        url: "https://reddit.com/r/hypixelskyblock",
      },
    ],
  },
  {
    label: "Misc",
    bookmarks: [
      { label: "Proton Mail", url: "https://mail.proton.me/" },
      {
        label: "Gmail",
        url: "https://gmail.com/",
      },
      {
        label: "Movies",
        url: "https://soap2day.to/",
      },
      { label: "Anime", url: "https://9anime.to/" },
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
