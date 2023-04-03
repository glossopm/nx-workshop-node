# 💻 Lab 7 - Generate a type lib that the API and CLI can share

###### ⏰ Estimated time: 15 minutes

<br />

Now our project graph looks a bit disconnected. The CLI and the API still do not have anything in common. The power of Nx libraries is that they can be shared among any number of projects.

We'll look at creating libs to store Typescript interfaces and then we'll use the Nx **Move** generator to move that library around our project, with minimal effort.
<br /><br />

## 📚 Learning outcomes:

- **Explore other real-world examples of creating shared libs for a specific project**
- **Learn to use the `move` generator**
  <br /><br /><br />

## 📲 After this workshop, you should have:

<details>
  <summary>App Screenshot</summary>
  No change in how the app looks!
</details>

<details>
  <summary>File structure</summary>
  <img src="../assets/lab9_directory-structure.png" height="700" alt="lab9 file structure">
</details>
<br />

## 🏋️‍♀️ Steps:

1. **Stop serving** the API
   <br /><br />
2. **Generate a new `@nrwl/js` lib** called `util-interface` inside the `libs/api` folder.

   ⚠️ It's **important** that we create it in the `/api` folder for now
   <br /><br />

3. **Create your `Game` interface**: see `libs/api/util-interface/src/lib/`[api-util-interface.ts](../../examples/lab7/libs/api/util-interface/src/lib/api-util-interface.ts)
   <br /><br />
4. **Import it** in the API repository file: `apps/api/src/app/games.repository.ts`

   ⚠️ You might need to restart the Typescript compiler in your editor

   <details>
   <summary>🐳 Hint</summary>

   ```typescript
   import { Game } from '@bg-hoard/api/util-interface';
   const games: Game[] = [...];
   ```

   </details>
   <br />

5. **Build the API** and make sure there are no errors

   <details>
   <summary>🐳 Hint</summary>

   ```shell
   nx build api
   ```

   </details>
   <br />

6. **Inspect the project graph**
   <br /><br />
7. Make sure to **commit everything** before proceeding!
   <br /><br />

---

Our cli makes calls to the API, but it's currently typed to `any` - so our component has no idea about the shape of the objects it'll get back!

Let's fix that - we already have a `Game` interface in a lib. But it's nested in the `api` folder - we need to move it out to the root `libs/` folder so any project can use it!

---

8.  Use the `@nrwl/workspace:move` generator to **move the interface lib** created above into the root `/libs` folder

    ⚠️ Make sure you use the `--dry-run` flag until you're confident your command is correct

     <details>
     <summary>🐳 Hint 1</summary>
     <img src="../assets/lab2_cmds.png" alt="Nx generate cmd structure">
     </details>

     <details>
     <summary>🐳 Hint 2</summary>

    Use the `--help` command to figure out how to target a specific **project**
    Alternatively, check out the [docs](https://nx.dev/packages/workspace/generators/move)

     </details>

     <details>

     <summary>🐳 Hint 3</summary>

    Your library name is `api-util-interface` - to move it to root, its new name needs to be `util-interface`

     </details>
    <br />

2.  We can now **import it in the CLI** and use it when making the http request:

     <details>
     <summary>🐳 Hint</summary>

    CLI main file: `apps/cli/src/main.ts`

   ```typescript
   import { Game } from '@bg-hoard/util-interface';

   // ...

   fetch(fetchUrl).then(response => response.json().then((val: Game[]) => {
      console.log(val.map(game => `${game.name}: ${game.description}`).join('\\n'));
   }));
    ```

     </details>

    ⚠️ Open `apps/api/src/app/games.repository.ts`. Notice how we didn't have to update the imports in the API. The `move` generator took care of that for us!
    <br /><br />

3.  **Trigger a build** of both the store and the API projects and make sure it passes
    <br /><br />
4.  **Inspect the project graph**
    <br /><br />
5.  **Inspect what changed** from the last time you committed, then **commit your changes**
    <br /><br />

---

🎓If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ Next lab ➡️](../lab10%20-%20bonus/LAB.md)
