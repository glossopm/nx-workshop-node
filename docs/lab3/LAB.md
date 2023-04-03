# 💻 Lab 3 - Executors

###### ⏰ Estimated time: 5-15 minutes

<br />

We'll build the app we just created, and look at what executors are and how to customize them.

<br /><br />

## 📚 Learning outcomes:

- **Understand what a `target` and `executor` are**
- **Learn how to invoke executors**
- **Configure executors by passing them different options**
- **Understand how an executor can invoke another executor**
  <br /><br /><br />

## 📲 After this workshop, you should have:

<details>
  <summary>App Screenshot</summary>
  <img src="../assets/lab3_screenshot.png" width="500" alt="screenshot of lab3 result">
</details>

<details>
  <summary>File structure</summary>
  <img src="../assets/lab3_directory-structure.png" height="700" alt="lab3 file structure">
</details>

## 🏋️‍♀️ Steps:

1. **Build the app**

   <details>
   <summary>🐳 Hint</summary>
   <img src="../assets/lab3_build_cmds.png" alt="Nx executor command structure">
   </details>
   <br />

2. You should now have a `dist` folder - let's **open it up**!
   - This is your whole app's output! If we wanted we could push this now to a server and it would all work.
     <br /> <br />
3. **Open up `apps/api/project.json`** and look at the object under `targets/build`
   - this is the **target**, and it has an **executor** option, that points to `@nrwl/esbuild:esbuild`
   - 
     <br /> <br />
4. **Open up the `dist` folder** again - notice how each ts file has a corresponding js file in the dist folder.
   <br /> <br />
5. **Modify `project.json`** and instruct the executor to bundle all the ts files into a single js file.

   <details>
    <summary>🐳 Hint</summary>
    
    Set the `bundle` option to true
   </details>

   🎓Notice how we can configure executors by either modifying their options in `project.json` (this step) or through the command line `--bundle=true`!
   <br /> <br />

6. The **serve** target (located a bit lower in `project.json`) also contains a executor, that _uses_ the output from the **build** target we just changed
   (see `serve --> options --> browserTarget` --> it points to the `build` target of the `api` project)
     <br /> <br />
7. **Inspect what changed** from the last time you committed, then **commit your changes**
   <br /> <br />

---

🎓If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ Next lab ➡️](../lab4/LAB.md)
