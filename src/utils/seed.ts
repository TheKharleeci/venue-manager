import util from 'util';
import fs from 'fs';
import Channel from '@/models/channel.model';
import Venue from '@/models/venue.model';
import Room from '@/models/room.model';


const readFile = util.promisify(fs.readFile);

const seedRooms = async () => {
  const rooms = await Room.countDocuments();

  if(!rooms) {       
      const roomData = JSON.parse(
          await readFile('./documents/room.json', 'utf-8')
        );
          await Room.insertMany(roomData)
          .then(() => {
            console.log('Room data seeded successfully!');
          })
          .catch((error) => {
            console.log(error)
            throw new Error('Error seeding room data');
          });
  }
};

const seedVenues = async () => {
    const venues = await Venue.countDocuments();

    if(!venues) {       
        const venueData = JSON.parse(
            await readFile('./documents/venue.json', 'utf-8')
          );
            await Venue.insertMany(venueData)
            .then(() => {
              seedRooms();
              console.log('Venue data seeded successfully!');
            })
            .catch((error) => {
              throw new Error('Error seeding venue data');
            });
    }
};

const seedChannels = async () => {
    const channels = await Channel.countDocuments();

    if(!channels) {       
        const channelData = JSON.parse(
            await readFile('./documents/channel.json', 'utf-8')
          );
          await Channel.insertMany(channelData)
          .then(() => {                
                console.log('Channel data seeded successfully!');
                seedVenues();
            })
            .catch((error) => {
              throw new Error('Error seeding channel data');
            });
    }
};

export default seedChannels;