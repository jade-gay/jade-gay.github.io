/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");
const searchBadge = document.querySelector("#searchBadge");

const lookup = {
  "/": "/",
  reddit: "https://reddit.com/",
  maps: "https://maps.google.com/",
  yt: "https://youtube.com/",
  git: "https://github.com/",
  chatgpt: "https://chatgpt.com/",
  seedbox: "https://may.thor.usbx.me/qbittorrent/",
  arch: "https://wiki.archlinux.org/title/Main_page",
  roblox: "https://roblox.com",
  puppyfin: "https://puppyf.in",
  protondb: "https://www.protondb.com/",
  "c": "https://exercism.org",
};

const engine = "google";
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?search_query=",
};

const isWebUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const isDomain = (value) => /^[a-z0-9.-]+\.[a-z]{2,}$/.test(value);

const getTargetUrl = (value) => {
  const normalizedValue = value.toLowerCase();
  if (isWebUrl(normalizedValue)) return normalizedValue;
  if (isDomain(normalizedValue)) return `https://${normalizedValue}`;

  const splitValue = normalizedValue.split("/");
  if (splitValue.length > 1) {
    const [prefix, ...queryParts] = splitValue;
    const queryString = queryParts.join(" ");
    
    if (prefix === 'r' && queryString.includes(':')) {
      const [subreddit, searchQuery] = queryString.split(':');
      return `https://reddit.com/r/${subreddit.trim()}/search/?q=${encodeURIComponent(searchQuery.trim())}`;
    }

    if (lookup[prefix]) {
      return lookup[prefix] + "results?search_query=" + encodeURIComponent(queryString);
    }
    if (engineUrls[prefix]) {
      return engineUrls[prefix] + encodeURIComponent(queryString);
    }
    if (prefix === 'r') {
      return `https://reddit.com/r/${queryString}`;
    }
  }

  if (normalizedValue in lookup) {
    return lookup[normalizedValue];
  }

  return engineUrls[engine] + encodeURIComponent(value);
};

const updateSearchIndicator = (value) => {
  const normalizedValue = value.toLowerCase();
  const splitValue = normalizedValue.split("/");
  if (splitValue.length > 1) {
    const [prefix] = splitValue;
    if (prefix === 'r') {
      if (normalizedValue.includes(':')) {
        searchBadge.style.display = 'inline-block';
        searchBadge.textContent = `Searching subreddit`;
        searchBadge.style.backgroundColor = '#cba6f7';
      } else {
        searchBadge.style.display = 'inline-block';
        searchBadge.textContent = `Searching Reddit`;
        searchBadge.style.backgroundColor = '#cba6f7';
      }
    } else if (lookup[prefix] || engineUrls[prefix]) {
      searchBadge.style.display = 'inline-block';
      searchBadge.textContent = `Searching ${prefix}`;
      searchBadge.style.backgroundColor = '#cba6f7';
    } else {
      searchBadge.style.display = 'none';
    }
  } else {
    searchBadge.style.display = 'none';
  }
};

const search = () => {
  const value = searchInput.value.trim();
  if (value === "") return;
  
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = (event) => {
  updateSearchIndicator(searchInput.value);
  if (event.key === "Enter") {
    search();
  }
};
searchButton.onclick = search;

/**
 * inject bookmarks into html
 */
const bookmarks = [
  {
    label: "Social Media",
    bookmarks: [
      { label: "YouTube", url: "https://youtube.com" },
      { label: "Reddit", url: "https://reddit.com/" },
      { label: "Kick", url: "https://kick.com" },
      { label: "Twitch", url: "https://twitch.tv" },
    ],
  },
  {
    label: "Reddit",
    bookmarks: [
      { label: "UnixPorn", url: "https://reddit.com/r/unixporn" },
      { label: "ArchLinux", url: "https://www.reddit.com/r/archlinux/" },
      { label: "Trans", url: "https://reddit.com/r/trans" },
      { label: "Cats", url: "https://reddit.com/r/cats" },
    ],
  },
  {
    label: "Misc",
    bookmarks: [
      { label: "Proton Mail", url: "https://mail.proton.me/" },
      { label: "Exercism", url: "https://exercism.org" },
      { label: "Seedbox", url: "https://may.thor.usbx.me/qbittorrent/" },
      { label: "Puppyfin", url: "https://puppyf.in" },
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
  bookmarksContainer.innerHTML = ''; // Ensure container is empty before injecting
  bookmarks.map(createGroup).forEach((group) => bookmarksContainer.append(group));
};

function recursiveAnimateTitle(string) {
  let firstLetter = string[0];
  let title = document.querySelector('title');
  title.innerHTML += firstLetter;
  if (string.length > 1) {
    setTimeout(function() {
      recursiveAnimateTitle(string.substring(1));
    }, 100);
  }
}

function animateTitle(string) {
  document.querySelector('title').innerHTML = "";
  recursiveAnimateTitle(string);
}

animateTitle('woof! <3');
injectBookmarks();
