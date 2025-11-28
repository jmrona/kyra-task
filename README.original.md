# Kyra Frontend Assignment: Asset Review

## Goal

Recreate the **Asset Review feature** shown in the reference screenshots.  
Interpret requirements from the designs and implement what you believe is the correct behavior.

Constraints:

* Use **React**.
* The implementation must be **responsive** and **usable on mobile**.
* Use any tooling or libraries you prefer.

---

## Reference Screens & Notes

Use the provided designs as your only source of truth.  
The brief notes below are descriptive (what the UI appears to convey), not prescriptive (how it must work). If something is unclear, make a sensible call and implement your decision.

| Assets                                        | Asset Review                                             | Comments View                                                      |
| --------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| ![Assets page](./docs/images/assets-page.png) | ![Asset Review](./docs/images/asset-review-overview.png) | ![Assets Review comments](./docs/images/asset-review-comments.png) |

### 1) Assets (collection view)

* Display a grid of asset cards.
* Each card should display the asset's status, creator name/avatar, and deliverable title.
* Assets are grouped by status.
* Filters exist to switch between workflow stages.
* Clicking a card opens the **Asset Review** screen for that item


### 2) Asset Review — Overview

* The screen is split into **two panels**:
  * Left panel:
    * Displays the asset's media and metadata.
    * Includes a top bar with the asset's status and an "Edit Status" action.
  * Right panel (**Overview** tab):
    * Displays brand and brief metadata.
    * Shows deliverable info.
    * Has a section titled **“Caption & Sound Instructions”**.


### 3) Asset Review — Messages

* Same two-pane layout; **right tab is “Messages.”**
* Shows a **conversation thread** with participant avatars/names, **timestamps**, and **inline link previews** (e.g., a URL rendered as a chip).
* The composer includes a **text input** and an **upload/submit button**.


---

## Mock Data

This repository already includes a Nitro project inside the `api/` folder.  
That server provides mock API endpoints for you to consume in your React project. 

To start the mock API, navigate into the `api/` directory and run the Nitro dev server.

---

## Evaluation Criteria

We'll evaluate your submission as a whole - not only the final result, but also how it reflects your understanding of the problem and your ability to turn ambiguous requirements into a coherent, maintainable product experience.  
There are no hidden requirements or preferred libraries. Build it as you would in a real environment where the goal is clarity, reliability, and usability.

---

## Submission

To submit your work, fork this repository, complete the assignment in your fork, and share the link to your fork with us. You may also include a live deployment if you'd like (for example, on Vercel or Netlify). 
