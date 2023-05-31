// dataHandler.js

const csvWriter = require('csv-writer').createObjectCsvWriter;
let writer;
let dataBuffer = [];

// Data fromat 
const createCsvWriter = () => {
    const date = new Date();
    const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    return csvWriter({
        path: `out_${timestamp}.csv`,
        header: [
            { id: 'UNIX_TIMESTAMP', title: 'UNIX_TIMESTAMP' },
            { id: 'TIME_HH_MM_SS_FF', title: 'TIME_HH_MM_SS_FF' },
            { id: 'MESSAGE', title: 'MESSAGE' },
            { id: 'GEAR', title: 'GEAR' },
            { id: 'WHEEL', title: 'WHEEL' },
            { id: 'PEDAL_GAS', title: 'PEDAL_GAS' },
            { id: 'PEDAL_BRAKE', title: 'PEDAL_BRAKE' },
            { id: 'PEDAL_CLUTCH', title: 'PEDAL_CLUTCH' },
            { id: 'D_PAD', title: 'D_PAD' },
            { id: 'POTMETER_PRESSED', title: 'POTMETER_PRESSED' },
            { id: 'POTMETER_LEFT', title: 'POTMETER_LEFT' },
            { id: 'POTMETER_RIGHT:', title: 'POTMETER_RIGHT:' },
            { id: 'A', title: 'A' },
            { id: 'B', title: 'B' },
            { id: 'X', title: 'X' },
            { id: 'Y', title: 'Y' },
            { id: 'TAB', title: 'TAB' },
            { id: 'XBOX', title: 'XBOX' },
            { id: 'YELLOW:', title: 'YELLOW:' },
            { id: 'SHIFT_PEDAL_LEFT', title: 'SHIFT_PEDAL_LEFT' },
            { id: 'SHIFT_PEDAL_RIGHT', title: 'SHIFT_PEDAL_RIGHT' },
        ],
    });
}

const writeDataToCsv = async () => {
    if (dataBuffer.length > 0) {
        await writer.writeRecords(dataBuffer);
        console.log('Data written to CSV');
        dataBuffer = [];
    }
};

setInterval(writeDataToCsv, 60 * 1000);

const startDataSave = () => {
    writer = createCsvWriter();
}

const formatData = (simplifiedData, message) => {
    const now = new Date();
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const timeHHMMSSFF = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}:${Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0')}`;

    // add data to buffer
    return {
        UNIX_TIMESTAMP: unixTimestamp,
        TIME_HH_MM_SS_FF: timeHHMMSSFF,
        MESSAGE: message || '',
        GEAR: simplifiedData ? simplifiedData.GEAR : '',
        WHEEL: simplifiedData ? simplifiedData.WHEEL : '',
        PEDAL_GAS: simplifiedData ? simplifiedData.PEDAL.GAS : '',
        PEDAL_BRAKE: simplifiedData ? simplifiedData.PEDAL.BRAKE : '',
        PEDAL_CLUTCH: simplifiedData ? simplifiedData.PEDAL.CLUTCH : '',
        D_PAD: simplifiedData ? simplifiedData.D_PAD : '',
        POTMETER_PRESSED: simplifiedData ? simplifiedData.POTMETER.PRESSED : '',
        POTMETER_LEFT: simplifiedData ? simplifiedData.POTMETER.LEFT : '',
        POTMETER_RIGHT: simplifiedData ? simplifiedData.POTMETER.RIGHT : '',
        A: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.A : '',
        B: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.B : '',
        X: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.X : '',
        Y: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.Y : '',
        TAB: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.TAB : '',
        XBOX: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.XBOX : '',
        YELLOW: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.YELLOW : '',
        SHIFT_PEDAL_LEFT: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.SHIFT_PEDAL_LEFT : '',
        SHIFT_PEDAL_RIGHT: simplifiedData && simplifiedData.BUTTONS ? simplifiedData.BUTTONS.SHIFT_PEDAL_RIGHT : '',
        // add more fields here as needed...
    };
};

const addDataToBuffer = (formattedData) => {
    dataBuffer.push(formattedData);
};

process.on('SIGINT', async () => {
    console.log(dataBuffer)
    await writeDataToCsv();
    process.exit();
});
module.exports = { addDataToBuffer, formatData, startDataSave, writeDataToCsv };
