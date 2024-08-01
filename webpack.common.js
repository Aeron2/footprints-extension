const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  mode: "development",
  entry: {
    popup: path.resolve("src/popup/popup.jsx"),
    background: path.resolve("src/background/background.js"),
    content: path.resolve("src/content/content.js"),
    assets: path.resolve("src/assets/tailwind.css"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static/manifest.json"),
          to: path.resolve("dist/manifest.json"),
        },
        {
          from: path.resolve("src/static/icon.png"),
          to: path.resolve("dist/icon.png"),
        },
      ],
    }),
    ...getHtmlPlugins(["popup"]),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    filename: "[name].js",
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
