/* ============================================================
   DUAL BOOT & LINUX — script.js
   ============================================================ */

// ── Dark mode ──────────────────────────────────────────────────
const THEME_KEY = 'dbl-theme';

const commandSections = [
  {
    id: 'basic-system',
    title: 'Basic System Commands',
    items: [
      { cmd: 'whoami', explanation: 'Shows the current signed-in username.', example: 'Use case: confirm that you are using the right account before running admin commands.' },
      { cmd: 'pwd', explanation: 'Prints the directory you are currently in.', example: 'Use case: check your location before moving, copying, or editing files.' },
      { cmd: 'cd /home', explanation: 'Moves to a different folder.', example: 'Use case: jump into the home directory to access shared files.' },
      { cmd: 'ls', explanation: 'Lists the files and folders in the current directory.', example: 'Use case: quickly inspect what is available before opening a file.' },
      { cmd: 'clear', explanation: 'Clears the terminal screen.', example: 'Use case: remove old output and keep the terminal tidy.' },
      { cmd: 'history', explanation: 'Shows recent commands you entered.', example: 'Use case: repeat a command you used earlier without retyping it.' },
      { cmd: 'man ls', explanation: 'Opens the manual page for a command.', example: 'Use case: learn the options available for a command you are unsure about.' },
      { cmd: 'shutdown -h now', explanation: 'Turns off the system immediately.', example: 'Use case: shut down the machine safely when your work is finished.' }
    ]
  },
  {
    id: 'disk-storage',
    title: 'Disk & Storage Management',
    items: [
      { cmd: 'df -h', explanation: 'Shows how much disk space is free.', example: 'Use case: check available storage before downloading large files.' },
      { cmd: 'du -sh /var/log', explanation: 'Shows the size of a folder.', example: 'Use case: find which directories are using the most space.' },
      { cmd: 'lsblk', explanation: 'Lists connected storage devices.', example: 'Use case: inspect disks and partitions when setting up new storage.' },
      { cmd: 'sudo find / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 20', explanation: 'Finds the largest files on the system.', example: 'Use case: locate space-hungry files that should be removed or archived.' },
      { cmd: 'sudo apt install ncdu', explanation: 'Installs a terminal tool to view disk usage.', example: 'Use case: analyze storage usage from the command line.' },
      { cmd: 'sudo apt install baobab', explanation: 'Installs a graphical disk analyzer.', example: 'Use case: visually inspect which folders consume the most space.' }
    ]
  },
  {
    id: 'security',
    title: 'Encryption & Security',
    items: [
      { cmd: 'chmod +x script.sh', explanation: 'Makes a file executable.', example: 'Use case: run a shell script directly from the terminal.' },
      { cmd: 'chmod 600 private.key', explanation: 'Restricts file access to the current user only.', example: 'Use case: protect private keys so other users cannot read them.' },
      { cmd: 'shred -n 5 -zu -v secret.txt', explanation: 'Overwrites a file multiple times to make recovery hard.', example: 'Use case: securely remove sensitive files before disposing of a drive.' },
      { cmd: 'zip -er archive.zip folder', explanation: 'Creates an encrypted ZIP archive.', example: 'Use case: send confidential files safely to someone else.' },
      { cmd: 'gpg -c my_secret.txt', explanation: 'Encrypts a file with GPG.', example: 'Use case: protect important documents with a password.' },
      { cmd: 'gpg -d my_secret.txt.gpg > my_secret.txt', explanation: 'Decrypts a GPG-encrypted file.', example: 'Use case: recover a protected file after entering the password.' }
    ]
  },
  {
    id: 'file-ops',
    title: 'File & Directory Operations',
    items: [
      { cmd: 'mkdir -p Projects/web/app', explanation: 'Creates nested folders without errors if some already exist.', example: 'Use case: build a project folder structure quickly.' },
      { cmd: 'cp -r my_folder/ /backup/my_folder/', explanation: 'Copies an entire directory and its contents.', example: 'Use case: back up a folder before making changes.' },
      { cmd: 'mv old_name.txt new_name.txt', explanation: 'Renames or moves a file.', example: 'Use case: change file names to keep projects organized.' },
      { cmd: 'rm -rf temp/', explanation: 'Deletes a folder and everything inside it.', example: 'Use case: remove temporary files you no longer need.' },
      { cmd: 'find . -type f -name "*.py"', explanation: 'Finds Python files in the current folder tree.', example: 'Use case: locate scripts for debugging or editing.' },
      { cmd: 'ln -s target link', explanation: 'Creates a symbolic link to another file or folder.', example: 'Use case: create shortcuts for frequently used locations.' }
    ]
  },
  {
    id: 'git',
    title: 'Git Version Control',
    items: [
      { cmd: 'git init', explanation: 'Starts a new Git repository in the current folder.', example: 'Use case: begin tracking a new project with Git.' },
      { cmd: 'git add .', explanation: 'Stages all modified files for commit.', example: 'Use case: prepare your changes before saving them in Git.' },
      { cmd: 'git commit -m "Initial commit"', explanation: 'Creates a commit with a descriptive message.', example: 'Use case: save a milestone in your project history.' },
      { cmd: 'git push -u origin main', explanation: 'Uploads your local changes to a remote repository.', example: 'Use case: share your work on GitHub or GitLab.' },
      { cmd: 'git status', explanation: 'Shows modified, staged, and untracked files.', example: 'Use case: review your repository before committing.' },
      { cmd: 'git log --oneline', explanation: 'Shows recent commits in a compact format.', example: 'Use case: quickly review your project timeline.' },
      { cmd: 'git pull', explanation: 'Downloads the latest changes from the remote repository.', example: 'Use case: sync your local branch with the team.' },
      { cmd: 'git clone https://github.com/user/repo.git', explanation: 'Downloads an existing repository to your machine.', example: 'Use case: start working from a project hosted online.' }
    ]
  },
  {
    id: 'media',
    title: 'Media Processing',
    items: [
      { cmd: 'ffmpeg -i input.mp4 -q:a 0 -map a output.mp3', explanation: 'Extracts audio from a video file.', example: 'Use case: save the sound from a video as an MP3.' },
      { cmd: 'ffmpeg -i input.mp4 -c copy -an muted.mp4', explanation: 'Removes the audio track from a video.', example: 'Use case: create a silent version for a presentation.' },
      { cmd: 'ffmpeg -i input.mp4 -vf scale=1280:720 output_720p.mp4', explanation: 'Resizes a video to a smaller resolution.', example: 'Use case: make videos fit better for web sharing.' },
      { cmd: 'yt-dlp -x --audio-format mp3 https://youtube.com/watch?v=ID', explanation: 'Downloads audio from a video link.', example: 'Use case: save music or podcast audio quickly.' },
      { cmd: 'img2pdf image.jpg -o converted_img.pdf', explanation: 'Converts an image file into PDF format.', example: 'Use case: turn a scanned photo into a PDF document.' },
      { cmd: 'ffmpeg -i input.mp4 -vf fps=1 frame_%04d.png', explanation: 'Extracts still frames from a video.', example: 'Use case: create thumbnails or screenshots from video content.' }
    ]
  },
  {
    id: 'network',
    title: 'Network & Remote Access',
    items: [
      { cmd: 'ssh -i key.pem ubuntu@server', explanation: 'Connects to a remote machine over SSH.', example: 'Use case: access a server securely from your terminal.' },
      { cmd: 'scp -i key.pem report.pdf ubuntu@server:/home/ubuntu/docs/', explanation: 'Copies a file to a remote server over SSH.', example: 'Use case: send reports to a remote machine.' },
      { cmd: 'rsync -avz -e ssh /local/path/ user@remote:/remote/path/', explanation: 'Synchronizes files securely between machines.', example: 'Use case: back up folders to a remote server.' },
      { cmd: 'curl ifconfig.me', explanation: 'Shows your public IP address.', example: 'Use case: verify your current internet connection details.' },
      { cmd: 'wget https://example.com/file.zip', explanation: 'Downloads a file from the web.', example: 'Use case: save software archives or documents locally.' },
      { cmd: 'lsof -i:3000', explanation: 'Shows which process is using a port.', example: 'Use case: identify a web app that is already running on a port.' },
      { cmd: 'nmcli device show', explanation: 'Displays network interface information.', example: 'Use case: inspect your network setup when troubleshooting connectivity.' },
      { cmd: 'hostname -I', explanation: 'Shows the local IP addresses of the machine.', example: 'Use case: find the address to connect to a device on the same network.' }
    ]
  },
  {
    id: 'package-management',
    title: 'Package Management',
    items: [
      { cmd: 'sudo apt update', explanation: 'Refreshes the list of available packages.', example: 'Use case: make sure your package sources are current before installing software.' },
      { cmd: 'sudo apt install nginx', explanation: 'Installs a package from the repository.', example: 'Use case: add software such as a web server to your system.' },
      { cmd: 'sudo apt remove nginx', explanation: 'Removes a package from the system.', example: 'Use case: uninstall software you no longer need.' },
      { cmd: 'apt search python3-pandas', explanation: 'Searches packages by name.', example: 'Use case: discover the package name before installing it.' },
      { cmd: 'dpkg -l', explanation: 'Lists installed Debian packages.', example: 'Use case: inspect the software already present on your system.' },
      { cmd: 'snap list --all', explanation: 'Lists installed Snap packages.', example: 'Use case: review packaged applications managed by Snap.' }
    ]
  },
  {
    id: 'pdf-toolkit',
    title: 'PDF Toolkit',
    items: [
      { cmd: 'pdftk file1.pdf file2.pdf cat output merged.pdf', explanation: 'Merges two or more PDF files.', example: 'Use case: combine reports into a single document.' },
      { cmd: 'pdftk input.pdf burst output page_%02d.pdf', explanation: 'Splits a PDF into individual pages.', example: 'Use case: extract one page from a larger document.' },
      { cmd: 'qpdf --password=YOUR_PASSWORD --decrypt input.pdf unlocked_output.pdf', explanation: 'Decrypts a password-protected PDF.', example: 'Use case: remove protections when you are authorized to edit the file.' },
      { cmd: 'gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -dPDFSETTINGS=/screen -sOutputFile=compressed.pdf input.pdf', explanation: 'Compresses a PDF to reduce file size.', example: 'Use case: make large PDFs easier to share online.' },
      { cmd: 'pdfcrack -f input.pdf', explanation: 'Attempts to recover a PDF password.', example: 'Use case: test password recovery on a file you own.' }
    ]
  },
  {
    id: 'system-info',
    title: 'System Information & Monitoring',
    items: [
      { cmd: 'lsb_release -a', explanation: 'Shows Linux distribution details.', example: 'Use case: confirm which Ubuntu or Debian version you are running.' },
      { cmd: 'top', explanation: 'Displays running processes in real time.', example: 'Use case: monitor resource-heavy programs.' },
      { cmd: 'htop', explanation: 'Provides an interactive process monitor.', example: 'Use case: manage CPU and memory usage more easily.' },
      { cmd: 'upower -e | grep "BAT"', explanation: 'Finds the battery device path.', example: 'Use case: inspect laptop battery information.' },
      { cmd: 'fc-list : family | grep -i "arial"', explanation: 'Lists installed fonts matching a name.', example: 'Use case: find whether a font is already installed.' },
      { cmd: 'qrencode -t ansiutf8 "https://example.com"', explanation: 'Generates a QR code in the terminal.', example: 'Use case: create a QR code for a website link.' },
      { cmd: 'seq 1 5', explanation: 'Prints a sequence of numbers.', example: 'Use case: generate numbered lists for scripts or demos.' },
      { cmd: 'nl file.txt', explanation: 'Numbers each line in a file.', example: 'Use case: review file contents with line references.' }
    ]
  },
  {
    id: 'text-processing',
    title: 'Text Processing & Search',
    items: [
      { cmd: "grep 'error' output.log", explanation: 'Searches a file for a specific word or pattern.', example: 'Use case: find errors in a log file quickly.' },
      { cmd: "grep -ri 'hello' /Documents", explanation: 'Searches recursively through files and folders.', example: 'Use case: find a phrase across many documents.' },
      { cmd: "awk '{print $1}' filename.dat", explanation: 'Extracts the first column from a file.', example: 'Use case: pull specific data values from a dataset.' },
      { cmd: "sed 's/pizza/burger/g' food.txt", explanation: 'Replaces text in a file.', example: 'Use case: update repeated words across a document.' },
      { cmd: "tr 'a-z' 'A-Z' < file.txt", explanation: 'Converts lowercase letters to uppercase.', example: 'Use case: format text before sharing it.' },
      { cmd: 'head -n 20 log.txt', explanation: 'Shows the first lines of a file.', example: 'Use case: preview the start of a large log file.' },
      { cmd: 'tail -n 50 log.txt', explanation: 'Shows the last lines of a file.', example: 'Use case: inspect the recent part of a log file.' },
      { cmd: 'less file.txt', explanation: 'Lets you view a file page by page.', example: 'Use case: browse long documents without loading everything at once.' }
    ]
  },
  {
    id: 'text-editors',
    title: 'Text Editors',
    items: [
      { cmd: 'nano filename.txt', explanation: 'Opens a simple terminal text editor.', example: 'Use case: edit configuration files when you want a beginner-friendly editor.' },
      { cmd: 'vim filename.txt', explanation: 'Opens the powerful Vim editor.', example: 'Use case: edit files efficiently once you learn the keyboard shortcuts.' },
      { cmd: 'gedit filename.txt', explanation: 'Opens the graphical Gedit editor.', example: 'Use case: edit text files in a desktop-friendly interface.' },
      { cmd: 'sudo apt install texstudio', explanation: 'Installs a LaTeX editor.', example: 'Use case: add a dedicated editor for scientific documents.' }
    ]
  },
  {
    id: 'vpn-tunnel',
    title: 'VPN & Tunneling',
    items: [
      { cmd: 'warp-cli connect', explanation: 'Connects to Cloudflare WARP.', example: 'Use case: secure your internet connection quickly.' },
      { cmd: 'warp-cli status', explanation: 'Shows the current WARP connection status.', example: 'Use case: verify whether WARP is active.' },
      { cmd: 'lt --port 3000', explanation: 'Exposes a local server to the internet.', example: 'Use case: share a local app with a teammate.' },
      { cmd: 'python3 -m http.server 8000', explanation: 'Starts a simple web server from the current folder.', example: 'Use case: serve files locally for testing.' },
      { cmd: 'ttyd -p 8080', explanation: 'Shares a terminal through a browser.', example: 'Use case: access a remote terminal in a web browser.' },
      { cmd: 'wormhole send file.txt', explanation: 'Transfers files securely with a short code.', example: 'Use case: send a file to another device without email.' }
    ]
  },
  {
    id: 'latex',
    title: 'Working with LaTeX',
    items: [
      { cmd: 'sudo apt install texlive-full', explanation: 'Installs the full LaTeX toolchain.', example: 'Use case: set up a complete LaTeX environment for advanced documents.' },
      { cmd: 'sudo apt install texlive-base texlive-latex-base', explanation: 'Installs the core LaTeX packages.', example: 'Use case: get the basics needed for simple LaTeX documents.' },
      { cmd: 'sudo apt install latexmk', explanation: 'Installs a helper tool for compiling LaTeX files.', example: 'Use case: simplify the build process for LaTeX projects.' },
      { cmd: 'latexmk -pdf main.tex', explanation: 'Compiles a LaTeX document into a PDF.', example: 'Use case: build your document after editing the source file.' }
    ]
  },
  {
    id: 'image-tools',
    title: 'Image Tools',
    items: [
      { cmd: 'sudo apt install imagemagick', explanation: 'Installs the ImageMagick image toolkit.', example: 'Use case: add image conversion and editing tools to your system.' },
      { cmd: 'magick input.png output.jpg', explanation: 'Converts an image to a different format.', example: 'Use case: turn a PNG into a JPG for easier sharing.' },
      { cmd: 'magick input.jpg -resize 800x600 output.jpg', explanation: 'Resizes an image to specific dimensions.', example: 'Use case: prepare images for a website or presentation.' },
      { cmd: 'magick input.jpg -quality 80 output.jpg', explanation: 'Reduces the file size of an image.', example: 'Use case: compress images to save storage space.' }
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getInitials(name) {
  return String(name || 'R')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('') || 'R';
}

function attachCommentInteractions(article, replyButton, replyForm, repliesList, replySummary) {
  const cancelButton = replyForm.querySelector('.comment-reply-form__cancel');

  article.querySelectorAll('.comment-reaction').forEach((button) => {
    button.addEventListener('click', () => {
      const reaction = button.dataset.reaction;
      const opposite = reaction === 'like' ? 'dislike' : 'like';
      const count = button.querySelector('.comment-reaction__count');
      const oppositeButton = article.querySelector(`[data-reaction="${opposite}"]`);
      const wasActive = button.classList.contains('is-active');

      button.classList.toggle('is-active', !wasActive);
      if (count) count.textContent = String(Math.max(0, Number(count.textContent || '0') + (wasActive ? -1 : 1)));

      if (!wasActive && oppositeButton?.classList.contains('is-active')) {
        oppositeButton.classList.remove('is-active');
        const oppositeCount = oppositeButton.querySelector('.comment-reaction__count');
        if (oppositeCount) oppositeCount.textContent = String(Math.max(0, Number(oppositeCount.textContent || '0') - 1));
      }
    });
  });

  const syncReplySummary = () => {
    const count = Number(article.dataset.replyCount || '0');
    if (count > 0) {
      replySummary.hidden = false;
      replySummary.textContent = repliesList.hidden
        ? (count === 1 ? 'View reply' : `View replies (${count})`)
        : (count === 1 ? 'Hide reply' : 'Hide replies');
      replySummary.setAttribute('aria-expanded', String(!repliesList.hidden));
    } else {
      replySummary.hidden = true;
      replySummary.setAttribute('aria-expanded', 'false');
      repliesList.hidden = true;
    }
  };

  replySummary.addEventListener('click', () => {
    repliesList.hidden = !repliesList.hidden;
    syncReplySummary();
  });

  replyButton.addEventListener('click', () => {
    replyForm.hidden = !replyForm.hidden;
    replyButton.setAttribute('aria-expanded', String(!replyForm.hidden));
    if (!replyForm.hidden) replyForm.querySelector('textarea').focus();
  });

  cancelButton.addEventListener('click', () => {
    replyForm.hidden = true;
    replyForm.reset();
    replyButton.setAttribute('aria-expanded', 'false');
  });

  replyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const textarea = replyForm.querySelector('textarea');
    const replyMessage = (textarea.value || '').trim();
    if (!replyMessage) {
      textarea.focus();
      return;
    }

    const replyNode = buildCommentCard('You', replyMessage, { isReply: true });
    repliesList.appendChild(replyNode);
    article.dataset.replyCount = String(Number(article.dataset.replyCount || '0') + 1);
    repliesList.hidden = false;
    replyForm.reset();
    replyForm.hidden = true;
    replyButton.setAttribute('aria-expanded', 'false');
    syncReplySummary();
  });

  syncReplySummary();
}

function buildCommentCard(name, message, options = {}) {
  const isReply = Boolean(options.isReply);
  const dateValue = options.date || new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const initials = getInitials(name);

  const replySummary = document.createElement('button');
  replySummary.type = 'button';
  replySummary.className = 'comment-item__view-replies';
  replySummary.hidden = true;
  replySummary.textContent = 'View reply';

  const article = document.createElement('article');
  article.className = `comment-item${isReply ? ' is-reply' : ''}`;
  article.dataset.replyCount = '0';
  article.innerHTML = `
    <div class="comment-item__avatar" aria-label="${escapeHtml(name)} profile picture">${escapeHtml(initials)}</div>
    <div class="comment-item__body">
      <div class="comment-item__meta">
        <strong>${escapeHtml(name)}</strong>
        <span>${escapeHtml(dateValue)}</span>
      </div>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <div class="comment-item__actions">
        <button type="button" class="comment-reaction" data-reaction="like" aria-label="Like comment">
          <span aria-hidden="true">&#128077;</span><span class="comment-reaction__count">0</span>
        </button>
        <button type="button" class="comment-reaction" data-reaction="dislike" aria-label="Dislike comment">
          <span aria-hidden="true">&#128078;</span>
        </button>
        <button type="button" class="comment-item__reply-trigger" aria-expanded="false">Reply</button>
      </div>
      <form class="comment-reply-form" hidden>
        <textarea name="reply-message" placeholder="Write a reply..."></textarea>
        <div class="comment-reply-form__actions">
          <button type="button" class="comment-reply-form__cancel">Cancel</button>
          <button type="submit" class="comment-reply-form__button">Send</button>
        </div>
      </form>
      <div class="comment-item__replies" hidden></div>
    </div>
  `;

  const replyTrigger = article.querySelector('.comment-item__reply-trigger');
  const replyForm = article.querySelector('.comment-reply-form');
  const repliesList = article.querySelector('.comment-item__replies');
  const body = article.querySelector('.comment-item__body');

  body.appendChild(replySummary);
  attachCommentInteractions(article, replyTrigger, replyForm, repliesList, replySummary);

  return article;
}

function renderCommandList() {
  const container = document.getElementById('commandList');
  if (!container) return;

  container.innerHTML = commandSections.map((section, index) => `
    <section class="cmd-section" id="${section.id}">
      <div class="cmd-section__heading">
        <span class="cmd-section__number">${index + 1}.</span>
        <h2>${escapeHtml(section.title)}</h2>
      </div>
      <article class="cmd-card">
        <div class="cmd-list">
        ${section.items.map(item => `
          <div class="cmd-item" data-search-text="${escapeHtml(`${item.cmd} ${item.explanation} ${item.example}`)}">
            <div class="cmd-item__row">
              <code class="cmd-item__command" data-copy="${escapeHtml(item.cmd)}" tabindex="0" role="button" aria-label="Copy command ${escapeHtml(item.cmd)}">${escapeHtml(item.cmd)}</code>
              <button class="cmd-item__copy" type="button" data-copy="${escapeHtml(item.cmd)}">Copy</button>
            </div>
            <div class="cmd-item__details">
              <p class="cmd-item__desc">${escapeHtml(item.explanation)}</p>
              <p class="cmd-item__example"><span>Use case:</span> ${escapeHtml(item.example)}</p>
            </div>
          </div>
        `).join('')}
      </div>
      </article>
    </section>
  `).join('');

  attachCommandCopyHandlers();
}

function attachCommandCopyHandlers() {
  document.querySelectorAll('.cmd-item__command, .cmd-item__copy').forEach((element) => {
    element.addEventListener('click', () => {
      const command = element.getAttribute('data-copy');
      if (!command) return;
      navigator.clipboard.writeText(command).then(() => {
        const feedback = element.closest('.cmd-item')?.querySelector('.cmd-item__copy');
        if (feedback) {
          const original = feedback.textContent;
          feedback.textContent = 'Copied';
          window.setTimeout(() => {
            feedback.textContent = original;
          }, 1200);
        }
      }).catch(() => {});
    });

    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        element.click();
      }
    });
  });
}

function initCommandSearch() {
  const searchInput = document.getElementById('cmdSearch');
  const cards = document.querySelectorAll('.cmd-card');
  if (!searchInput || !cards.length) return;

  const noResults = document.createElement('p');
  noResults.className = 'cmd-no-results';
  noResults.textContent = 'No matching commands found. Try a broader keyword.';
  noResults.hidden = true;
  searchInput.closest('.cmd-toolbar').insertAdjacentElement('afterend', noResults);

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    cards.forEach((card) => {
      const items = card.querySelectorAll('.cmd-item');
      let visibleItems = 0;

      items.forEach((item) => {
        const text = (item.getAttribute('data-search-text') || '').toLowerCase();
        const isMatch = !query || text.includes(query);
        item.classList.toggle('is-hidden', !isMatch);
        if (isMatch) visibleItems += 1;
      });

      const shouldShow = visibleItems > 0;
      card.classList.toggle('is-hidden', !shouldShow);
      if (shouldShow) visibleCards += 1;
    });

    noResults.hidden = visibleCards > 0;
  };

  searchInput.addEventListener('input', applyFilter);
  applyFilter();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const toggleBtn = document.getElementById('darkToggle');
  const label = document.querySelector('.toggle-dark__label');
  if (label) label.textContent = theme === 'dark' ? '☀' : '🌙';
  if (toggleBtn) {
    const action = theme === 'dark' ? 'light' : 'dark';
    toggleBtn.setAttribute('aria-label', `Switch to ${action} mode`);
    toggleBtn.setAttribute('title', `Switch to ${action} mode`);
  }
}

function withThemeTransition() {
  document.documentElement.classList.add('theme-transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 260);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || preferred);
}

function toggleTheme() {
  withThemeTransition();
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Navbar scroll behavior ───────────────────────────────────
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastY = window.scrollY;

  function handleScroll() {
    const currentY = window.scrollY;
    const isMobile = window.innerWidth <= 860;

    navbar.classList.toggle('navbar--scrolled', currentY > 24);

    // Keep navbar visible while at top, on mobile, or while mobile menu is open.
    if (currentY < 12 || isMobile || document.body.classList.contains('nav-open')) {
      navbar.classList.remove('navbar--hidden');
      lastY = currentY;
      return;
    }

    if (currentY > lastY + 3 && currentY > 110) {
      navbar.classList.add('navbar--hidden');
    } else if (currentY < lastY - 3) {
      navbar.classList.remove('navbar--hidden');
    }

    lastY = currentY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll);
  handleScroll();
}

// ── Mobile navigation ────────────────────────────────────────
function initMobileNav() {
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const nav = document.querySelector('.navbar__nav');
  const overlay = document.querySelector('.navbar__overlay');

  if (!toggle || !nav) return;

  function setOpen(isOpen) {
    body.classList.toggle('nav-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen && navbar) {
      navbar.classList.remove('navbar--hidden');
    }
  }

  toggle.addEventListener('click', () => {
    setOpen(!body.classList.contains('nav-open'));
  });

  if (overlay) {
    overlay.addEventListener('click', () => setOpen(false));
  }

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (event) => {
      const isMobileViewport = window.innerWidth <= 860;

      if (isMobileViewport) {
        event.preventDefault();
        setOpen(false);
        window.open(link.href, '_blank', 'noopener');
        return;
      }

      setOpen(false);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      setOpen(false);
    }
  });
}

// ── Active nav link ────────────────────────────────────────────
function setActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initLightbox() {
  const triggers = document.querySelectorAll('.lightbox-trigger[data-lightbox-target]');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    const targetId = trigger.getAttribute('data-lightbox-target');
    const lightbox = document.getElementById(targetId);
    if (!lightbox) return;

    const closeBtn = lightbox.querySelector('.lightbox__close');

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    const openLightbox = () => {
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    };

    trigger.addEventListener('click', openLightbox);

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  });
}

// ── Clipboard copy for command chips ─────────────────────────
function initClipboardCopy() {
  const buttons = document.querySelectorAll('[data-copy]');
  if (!buttons.length) return;

  let toast = document.getElementById('copyToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'copyToast';
    toast.className = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  let hideTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('show'), 1600);
  };

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy') || button.textContent.trim();

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const temp = document.createElement('textarea');
          temp.value = text;
          temp.setAttribute('readonly', '');
          temp.style.position = 'fixed';
          temp.style.left = '-9999px';
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }

        showToast('Copied to clipboard');
      } catch (error) {
        showToast('Copy failed');
      }
    });
  });
}

// ── Command search ──────────────────────────────────────────
function initCommandSearch() {
  const searchInput = document.getElementById('cmdSearch');
  const cards = document.querySelectorAll('.cmd-card');
  if (!searchInput || !cards.length) return;

  const noResults = document.createElement('p');
  noResults.className = 'cmd-no-results';
  noResults.textContent = 'No matching commands found. Try a broader keyword.';
  noResults.hidden = true;
  searchInput.closest('.cmd-toolbar').insertAdjacentElement('afterend', noResults);

  const applyFilter = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCards = 0;

    cards.forEach((card) => {
      const items = card.querySelectorAll('.cmd-item');
      let visibleItems = 0;

      items.forEach((item) => {
        const text = (item.getAttribute('data-search-text') || '').toLowerCase();
        const isMatch = !query || text.includes(query);
        item.classList.toggle('is-hidden', !isMatch);
        if (isMatch) visibleItems += 1;
      });

      const shouldShow = visibleItems > 0;
      card.classList.toggle('is-hidden', !shouldShow);
      if (shouldShow) visibleCards += 1;
    });

    noResults.hidden = visibleCards > 0;
  };

  searchInput.addEventListener('input', applyFilter);
  applyFilter();
}

function enhanceExistingComments() {
  document.querySelectorAll('.comment-item').forEach((comment) => {
    if (comment.dataset.commentEnhanced === 'true') return;
    comment.dataset.commentEnhanced = 'true';
    comment.dataset.replyCount = '0';

    const name = comment.querySelector('.comment-item__meta strong')?.textContent?.trim() || 'Reader';
    const text = comment.querySelector('p')?.textContent?.trim() || '';
    const date = comment.querySelector('.comment-item__meta span')?.textContent?.trim() || new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

    const avatar = document.createElement('div');
    avatar.className = 'comment-item__avatar';
    avatar.setAttribute('aria-label', `${name} profile picture`);
    avatar.textContent = getInitials(name);

    const body = document.createElement('div');
    body.className = 'comment-item__body';

    const meta = document.createElement('div');
    meta.className = 'comment-item__meta';
    meta.innerHTML = `<strong>${escapeHtml(name)}</strong><span>${escapeHtml(date)}</span>`;

    const paragraph = document.createElement('p');
    paragraph.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');

    const actions = document.createElement('div');
    actions.className = 'comment-item__actions';
    actions.innerHTML = `
      <button type="button" class="comment-reaction" data-reaction="like" aria-label="Like comment">
        <span aria-hidden="true">&#128077;</span><span class="comment-reaction__count">0</span>
      </button>
      <button type="button" class="comment-reaction" data-reaction="dislike" aria-label="Dislike comment">
        <span aria-hidden="true">&#128078;</span>
      </button>
    `;
    const replyButton = document.createElement('button');
    replyButton.type = 'button';
    replyButton.className = 'comment-item__reply-trigger';
    replyButton.textContent = 'Reply';
    replyButton.setAttribute('aria-expanded', 'false');
    actions.appendChild(replyButton);

    const viewReplies = document.createElement('button');
    viewReplies.type = 'button';
    viewReplies.className = 'comment-item__view-replies';
    viewReplies.hidden = true;
    viewReplies.textContent = 'View reply';

    const replyForm = document.createElement('form');
    replyForm.className = 'comment-reply-form';
    replyForm.hidden = true;
    replyForm.innerHTML = `
      <textarea name="reply-message" placeholder="Write a reply..."></textarea>
      <div class="comment-reply-form__actions">
        <button type="button" class="comment-reply-form__cancel">Cancel</button>
        <button type="submit" class="comment-reply-form__button">Send</button>
      </div>
    `;

    const repliesList = document.createElement('div');
    repliesList.className = 'comment-item__replies';
    repliesList.hidden = true;

    body.appendChild(meta);
    body.appendChild(paragraph);
    body.appendChild(actions);
    body.appendChild(replyForm);
    body.appendChild(repliesList);
    body.appendChild(viewReplies);

    comment.innerHTML = '';
    comment.appendChild(avatar);
    comment.appendChild(body);
    attachCommentInteractions(comment, replyButton, replyForm, repliesList, viewReplies);
  });
}

function initComments() {
  document.querySelectorAll('.comment-section').forEach((section) => {
    if (section.dataset.feedbackInitialized === 'true') return;
    section.dataset.feedbackInitialized = 'true';
    if (!section.id) section.id = 'article-comments';
    section.hidden = true;

    const feedbackButton = document.createElement('button');
    feedbackButton.type = 'button';
    feedbackButton.className = 'feedback-trigger';
    feedbackButton.textContent = 'Give feedback';
    feedbackButton.setAttribute('aria-expanded', 'false');
    feedbackButton.setAttribute('aria-controls', section.id || 'article-comments');
    section.insertAdjacentElement('beforebegin', feedbackButton);

    feedbackButton.addEventListener('click', () => {
      const isOpening = section.hidden;
      section.hidden = !isOpening;
      feedbackButton.textContent = isOpening ? 'Hide feedback' : 'Give feedback';
      feedbackButton.setAttribute('aria-expanded', String(isOpening));
      if (isOpening) {
        section.querySelector('input[name="comment-name"]')?.focus();
      }
    });
  });

  enhanceExistingComments();

  document.querySelectorAll('.comment-list').forEach((list) => {
    const items = Array.from(list.querySelectorAll(':scope > .comment-item'));
    if (items.length <= 1) return;

    items.forEach((item, index) => {
      item.hidden = index > 0;
    });

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'comment-list__toggle';
    toggleButton.textContent = 'See more comments';

    let expanded = false;
    toggleButton.addEventListener('click', () => {
      expanded = !expanded;
      items.forEach((item, itemIndex) => {
        if (itemIndex === 0) return;
        item.hidden = !(expanded || itemIndex === 0);
      });
      toggleButton.textContent = expanded ? 'Show fewer comments' : 'See more comments';
    });

    list.insertAdjacentElement('afterend', toggleButton);
  });

  document.querySelectorAll('.comment-form').forEach((form) => {
    const list = form.closest('.comment-section')?.querySelector('.comment-list');
    if (!list) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameField = form.querySelector('input[name="comment-name"]');
      const messageField = form.querySelector('textarea[name="comment-message"]');
      const name = (nameField?.value || 'Reader').trim() || 'Reader';
      const message = (messageField?.value || '').trim();

      if (!message) {
        if (messageField) messageField.focus();
        return;
      }

      const article = buildCommentCard(name, message, { date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) });
      list.prepend(article);
      const items = Array.from(list.querySelectorAll(':scope > .comment-item'));
      items.forEach((item, index) => {
        item.hidden = index > 0;
      });

      const existingToggle = list.parentElement?.querySelector('.comment-list__toggle');
      if (existingToggle) existingToggle.remove();

      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'comment-list__toggle';
      toggleButton.textContent = 'See more comments';

      let expanded = false;
      toggleButton.addEventListener('click', () => {
        expanded = !expanded;
        Array.from(list.querySelectorAll(':scope > .comment-item')).forEach((item, index) => {
          if (index === 0) return;
          item.hidden = !expanded;
        });
        toggleButton.textContent = expanded ? 'Show fewer comments' : 'See more comments';
      });

      if (items.length > 1) {
        list.insertAdjacentElement('afterend', toggleButton);
      }

      form.reset();
      messageField?.focus();
    });
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbarScroll();
  initMobileNav();

  // Dark mode toggle
  const toggleBtn = document.getElementById('darkToggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

  setActiveLink();
  initLightbox();
  renderCommandList();
  attachCommandCopyHandlers();
  initClipboardCopy();
  initCommandSearch();
  initComments();
});
