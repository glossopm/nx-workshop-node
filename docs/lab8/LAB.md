# 💡 Lab 8 - Module boundaries

###### ⏰ Estimated time: 10-15 minutes

<br /><br />

## 📚 Learning outcomes:

- **Understand how to assign scopes and type tags to your libraries**
- **How to specify boundaries around your tags and avoid circular dependencies in your repo**
- **How to use linting to trigger warnings or errors when you are not respecting these boundaries**
  <br /><br /><br />

## 🏋️‍♀️ Steps :

1. Open the `project.json` files for each project and **finish tagging the apps** accordingly:

   ```
     // apps/cli/project.json
     {
       "projectType": "application",
       "root": "apps/cli",
       "sourceRoot": "apps/cli/src",
       "prefix": "bg-hoard",
       "targets": { ... },
       "tags": ["scope:cli", "type:app"]
     }
   ```

   <br /><br />

2. Open the root `.eslintrc.json`, find the `"@nrwl/nx/enforce-module-boundaries"` rule and **set the `depConstraints`**:

   ```
   "depConstraints": [
       {
           "sourceTag": "scope:cli",
           "onlyDependOnLibsWithTags": ["scope:cli", "scope:shared"]
       },
       .... <-- finish adding constraints for the tags we defined in the previous step
   ]
   ```

   <br /><br />

3. **Run `nx run-many --target=lint --all --parallel`**

   💡 `nx run-many` allows you to run a specific target against a specific set of projects
   via the `--projects=[..]` option. However, you can also pass it the `--all` option
   to run that target against all projects in your workspace.

   💡 `--parallel` launches all the `lint` processes in parallel
   <br /><br />

4. We talked about the importance of setting boundaries between your workspace scopes.
   Let's try and **import an `api` lib** from a `cli` scope. - In `apps/cli/src/main.ts` - Try to `import { doAuth } from '@bg-hoard/api/auth';`
   <br /><br />

5. **Run linting** on all projects - you should see the expected error.
   <br /><br />
6. You can now **delete the import** above.
   <br /><br />
7.  **Run linting** again and check if all the errors went away.
   <br /><br />
8.  **Commit everything** before moving on to the next lab

---

🎓If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ Next lab ➡️](../lab13/LAB.md)
