<details>
  <summary>Routes</summary>

> **Cannot be imported into any other layer**
  
**Can import from**
* Services
* DTOs
* Utilities

Routes will be used for data presentation to the user, including response status and messages based on results from services.
</details>
<details>
  <summary>DTOs (Data Transfer Objects)</summary>

**Can import into**
* Routes
* Services

**Can import from**
* Utilities

DTOs are used for data structure and validation between layers to ensure consistency.
</details>
<details>
  <summary>Services</summary>

**Can import into**
* Routes

**Can import from**
* DAL
* Utilities

Services contain the core business logic for data processing and aggregation. Services do not structure the data for the view of the user.
</details>
<details>
  <summary>DAL (Data Access Layer)</summary>

**Can import into**
* Services

**Can import from**
* Utilities

DAL contains the CRUD operations and interactions with the database.
</details>
<details>
  <summary>Utilities</summary>

**Can import into**
* Routes
* Services
* DTOs
* DAL

> **Cannot import from any layer**

Utilities are functions to help enforce DRY, but should not depend on any of the code base to ensure the functions remain agnostic and available to all layers.
</details>
