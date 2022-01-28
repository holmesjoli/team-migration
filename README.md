# Migration Team Project

## Coding and collaborative practices

### Terminology

* **Git**: a language or system used to version control code
* **Github**: a free and open-source server used by teams to collaborate easily on code
* **Local**: the version of the code which you downloaded to your computer is referred to as
* **Remote**: the code which is stored on a server (e.g. Github.com)
* **Repository**: a file structure where all your code and related files (e.g. data, README, etc. are stored)
* **Version control**: a coding best practice that helps programmers collaborate by keeping track of different versions of the same code. Think of version control as a word document. One programmer saves a new version of a collaborative document and then works on it and another programmer saves another version. They each work on their separate parts. Version control helps them pull all of the parts back together and navigate conflicting changes between the documents.

### Getting started

1. Download Git![https://git-scm.com/downloads].
2. In your file explorer navigate to the folder where you want to store the repository
3. Right-click to open Git Bash
4. Copy and paste the code in git bash to run

```
git clone https://github.com/holmesjoli/team-migration.git
```

You will know it worked if you have a copied version of the repository. Alternatively, you can download and unzip the code at https://github.com/holmesjoli/team-migration. Click on the Green button which says *Code* and there will be an option to download. 

### Updating your repo

As different people on the team work on the code, the remote version of the code will get updated. Keep your local version up-to-date by running this code in your Git Bash Terminal.

```
git pull
```

## Project-specifics

### Data source

https://cadmus.eui.eu//handle/1814/73190

### To render Rmarkdown

With the Rmarkdown document open and selected in Rstudio you can use the following keyboard shortcuts. Alternatively, there is a blue knit button (with the a knitting symbol) at the top of the document which does the same thing as these shortcuts.

```
Cntrl+Shift+K
Cmd+Shift+K
```
