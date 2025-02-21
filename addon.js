const { addonBuilder } = require('stremio-addon-sdk');
const { fetchStreams } = require('./filmancc-plugin'); // Adjust the path as needed

const manifest = {
  id: 'community.filmancc',
  version: '1.0.0',
  name: 'Filman.cc Add-on',
  description: 'Streams movies from Filman.cc',
  resources: ['stream'],
  types: ['movie'],
  idPrefixes: ['tt'],
};

const builder = new addonBuilder(manifest);


builder.defineStreamHandler(async ({ id }) => {
  try {
    // Fetch streams from Filman.cc using the plugin
    const streams = await fetchStreams(id);

    // Return the streams in the required format
    return { streams };
  } catch (error) {
    console.error(`Error fetching streams for ${id}:`, error);
    return { streams: [] }; // Return an empty array on error
  }
});


module.exports = builder.getInterface();
