# Shridhar Athinarayanan's Portfolio

My portfolio website :)

_Replace the above link with the actual URL of your deployed portfolio site._

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Material-UI](https://mui.com/) for UI components
  - [Styled Components](https://styled-components.com/) / [CSS Modules](https://github.com/css-modules/css-modules) _(Choose based on your preference)_
- **Deployment:**
  - [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) / [GitHub Pages](https://pages.github.com/) _(Choose based on where you deploy)_

## Installation

Follow these steps to set up the project locally.

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-portfolio.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd your-portfolio
   ```

3. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the necessary packages:

   ```bash
   npm install
   ```

   _Or if you prefer using Yarn:_

   ```bash
   yarn install
   ```

4. **Create a `.env` File**

   If your project requires environment variables, create a `.env` file in the root directory and add your variables. For example:

   ```env
   REACT_APP_API_URL=https://api.yourdomain.com
   ```

5. **Run the Development Server**

   ```bash
   npm start
   ```

   _Or with Yarn:_

   ```bash
   yarn start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

### Building for Production

To create an optimized production build, run:
bash
npm run build
_Or with Yarn:_
bash
yarn build
The build artifacts will be stored in the `build/` directory.

### Deployment

You can deploy the production build to any static site hosting service like Vercel, Netlify, or GitHub Pages.

**Example Deployment with GitHub Pages:**

1. **Install `gh-pages`**

   ```bash
   npm install --save gh-pages
   ```

2. **Add the Following Scripts to `package.json`**

   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy the App**

   ```bash
   npm run deploy
   ```

## Contact

- **Email:** [shriathi@stanford.alumni.edu](mailto:shriathi@stanford.alumni.edu)
- **LinkedIn:** [Shridhar Athinarayanan](https://www.linkedin.com/in/shridhar-athinarayanan-638493199/)
- **GitHub:** [shridharathi](https://github.com/shridharathi)
- **Medium:** [@shridharathi](https://medium.com/@shridharathi)

Feel free to reach out for collaborations, questions, or just a friendly hello!
