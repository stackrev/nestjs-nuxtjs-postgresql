# Placement Panel Client

Placement Panel Client Project

## WorkFlow

The git workflow we're using at Tamuk project is Gitflow, a very popular workflow by Vincent Driessen.

Each step is briefly explained here so that you can start a feature and develop branch, and perform bug fixes on both release branches and the master branch.

Git extensions provide high-level repository operations for [Vincent Driessen's branching model][git-branching-model].

For more info, refer to the links: [git-flow-wiki] , [git-flow-cheatsheet] and [why-arent-you-using-git-flow].

---

### Start a new feature branch

Suppose, you want to do the task **locations**. The feature branch will be **f-locations**. So, From the scrum board:

- Move the task _F-locations_ from **'To Do'** to **'In Progress'** column
- Assgin it to yourself
- Open terminal
- Perform the following command:

```sh
$ git flow feature start locations
```

### Mark a feature as completed

When a feature was completed, perform the following command in the terminal:

```sh
$ git add [your-changes-on-the-feature-branch]
$ git commit -m "Your commit message"
$ git flow feature finish -r -F -S
```

Now, you are in the develop branch.

- Get the latest changes

```sh
$ git pull origin develop
```

You may encounter a conflict; In this case fix the conflicts and then commit the result. After that,

- Assert that your feature is still functional in the develop branch.
- Push the changes to remote:

```sh
$ git push
```

> **Note**: Make sure you're pushing to origin/develop.

--
Best regards,

[Mostafa.Gholami](https://github.com/mst-ghi)

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen."
[git-flow-wiki]: https://github.com/petervanderdoes/gitflow-avh/wiki
[git-flow-cheatsheet]: http://danielkummer.github.io/git-flow-cheatsheet/
[why-arent-you-using-git-flow]: https://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/
[git-branching-model]: http://nvie.com/posts/a-successful-git-branching-model/
