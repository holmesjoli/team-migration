# Migration Team Project

## Project-specifics

### Data source

* Law: https://cadmus.eui.eu//handle/1814/73190

* Migration pops: https://www.un.org/development/desa/pd/content/international-migrant-stock

### To render Rmarkdown

With the Rmarkdown document open and selected in Rstudio you can use the following keyboard shortcuts. Alternatively, there is a blue knit button (with the a knitting symbol) at the top of the document which does the same thing as these shortcuts.

```
Ctrl+Shift+K
Cmd+Shift+K
```

Right now, Rmarkdown is set to knit to a markdown file (.md).

## Coding and collaborative practices

### Terminology

* **Git**: a language or system used to version control code
* **Github**: a free and open-source server used by teams to collaborate easily on code
* **Local**: the version of the code which you downloaded to your computer is referred to as
* **Remote**: the code which is stored on a server (e.g. Github.com)
* **Repository**: a file structure where all your code and related files (e.g. data, README, etc. are stored)
* **Version control**: a coding best practice that helps programmers collaborate by keeping track of different versions of the same code. Think of version control as a word document. One programmer saves a new version of a collaborative document and then works on it and another programmer saves another version. They each work on their separate parts. Version control helps them pull all of the parts back together and navigate conflicting changes between the documents.

### Getting started

1. Download Git!(https://git-scm.com/downloads).
2. In your file explorer navigate to the folder where you want to store the repository
3. Right-click to open Git Bash
4. Copy and paste the code in git bash to run

```
git clone https://github.com/holmesjoli/team-migration.git
```

You will know it worked if you have a copied version of the repository. Alternatively, you can download and unzip the code at https://github.com/holmesjoli/team-migration. Click on the Green button which says *Code* and there will be an option to download. 

### Keeping your repo up-to-date

As different people on the team work on the code, the remote version of the code will get updated. Keep your local version up-to-date by running this code in your Git Bash/ Terminal.

```
git pull
```

### Branching

Before you start to modify the code a good idea is to branch off of the master branch. Branching is essentially the same idea as *Save As* in Microsoft Word. It allows you to save a version of the code that you want to make changes to.

Change the branch_name to whatever you want to call your branch. Generally branches are named to reflect the features that are going to be developed within them, but for this project you can call it whatever!

```
git checkout -b branch_name
```

### Merging in the master branch

As the code gets developed your branch will get behind the master branch. To prevent this from happening you will want to merge the master branch into your branch.

1. Checkout the master branch
2. Update the master branch so that your local copy reflects the same copy as the remote server
3. Checkout your local branch. Branch_name is whatever you named your branch in the previous step.
4. Merge the master branch into your local branch.

```
git checkout master
git pull
git checkout branch_name
git merge master
```

### Making changes to code

Most likely, you will want to contribute to the code base by making changes to the code. If you make changes locally, others won't be able to see those changes until your add them to the remote server (Github).

Here are the steps to push your changes to Github

1. Add the file you have modified or made changes to. 

Running `git status` first will let you know which files have been modified. This especially useful when developing an application where there are likely a lot of files which will be modified (e.g. HTML, CSS, JS)

```
git status
git add filename
```

2. Commit your changes

A commit message is a little message to let others know why you made a change to the code. This an important step in case a bug gets introduced. Commit messages help the team trace what changes were made and why. Commit messages should try to indicate the *why* instead of the *what*.

```
git commit -m "changed X because Y"
```

3. Push your changes to the remote server

*Origin* refers to your local branch. The word *master* refers to the upstream branch. If you're working off a different branch, then you'll want to change master to the name of the branch you're working on.
```
git push origin master
```

