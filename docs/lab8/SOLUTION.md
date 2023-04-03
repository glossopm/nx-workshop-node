##### The complete tags in your project.json files:

- cli: `"tags": ["scope:cli", "type:app"]`
- cli-e2e: `"tags": ["scope:cli", "type:e2e"]`
- api: `"tags": ["scope:api", "type:app"]`
- api-e2e: `"tags": ["scope:api", "type:e2e"]`
- api-auth: `"tags": ["scope:api", "type:data-access"]`
- util-interface: `"tags": ["scope:shared", "type:util"]`

##### nx-enforce-module-boundaries rules:

```json
"depConstraints": [
          {
            "sourceTag": "scope:cli",
            "onlyDependOnLibsWithTags": ["scope:cli", "scope:shared"]
          },
          {
            "sourceTag": "scope:api",
            "onlyDependOnLibsWithTags": ["scope:api", "scope:shared"]
          },
          {
            "sourceTag": "scope:shared",
            "onlyDependOnLibsWithTags": ["scope:shared"]
          },
          {
            "sourceTag": "type:data-access",
            "onlyDependOnLibsWithTags": ["type:data-access", "type:util"]
          },
          {
            "sourceTag": "type:util",
            "onlyDependOnLibsWithTags": ["type:util"]
          }
        ]
```
