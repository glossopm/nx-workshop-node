# 💻 Lab 5 - Generate an auth library

###### ⏰ Estimated time: 5-10 minutes
<br />

Let's create a library to handle all the authentication logic.  For this workshop, we'll just export some functions but, in a real app, this is where you'd hook into whatever service is handling your auth or you could write your own logic here.

<br /><br />

## 📚 Learning outcomes:

- **Get familiar with generating project specific, framework agnostic utility libs**

## 📲 After this workshop, you should have:

<details>
  <summary>App Screenshot</summary>
  <img src="../assets/lab5_screenshot.png" width="500" alt="screenshot of lab5 result">
</details>

<details>
  <summary>File structure</summary>
  <img src="../assets/lab5_directory-structure.png" height="700" alt="lab5 file structure">
</details>
<br />

## 🏋️‍♀️ Steps:

1. **Stop the `nx serve`** if it is still running
   <br /><br />
2. **Use the `@nrwl/js` package to generate another lib** in the `libs/api` folder - let's call it `auth`.
   <br /><br />
3. **Add the [code for the auth library](../../examples/lab5/libs/api/auth/src/lib/api-auth.ts)** to the new library you just created `libs/api/auth/src/lib/api-auth.ts`
   <br /><br />
4. **Use it in your api** by creating a new `/auth` endpoint ([code](../../examples/lab5/apps/api/src/main.ts))

    <details>
    <summary>🐳 Hint</summary>

   `main.ts`:

   ```ts
   import { doAuth } from '@bg-hoard/api/auth';
   //...

   app.post('/api/auth', (req, res) => {
      res.send(doAuth());
   });
   ```

    </details>
   <br />

5. Launch the project graph - notice how the app depends on the `auth` lib now.
   <br /><br />
6. Inspect what changed from the last time you committed, then commit your changes
   <br /><br />

---

🎓If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ Next lab ➡️](../lab6/LAB.md)
