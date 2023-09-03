const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 5000;

// For the /current Endpoint
app.get('/current', async (req, res) => {
  try {
    const url = 'https://www.chittorgarh.com/report/ipo-subscription-status-live-bidding-from-bse-nse/21/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scrapedData = [];

    const rows = $('table.table-bordered tbody tr');

    rows.each((index, row) => {
      const rowData = {
        'Company Link': '',
        'Company Name': '',
        'Close Date': '',
        'Size (Rs Cr)': '',
        'QIB (x)': '',
        'sNII (x)': '',
        'bNII (x)': '',
        'NII (x)': '',
        'Retail (x)': '',
        'Employee (x)': '',
        'Others (x)': '',
        'Total (x)': '',
        'Applications': '',
        'Compare': ''
      };

      const columns = $(row).find('td');

      rowData['Company Link'] = $(columns[0]).find('a').attr('href');
      rowData['Company Name'] = $(columns[0]).find('a').text().trim();
      rowData['Close Date'] = $(columns[1]).text().trim();
      rowData['Size (Rs Cr)'] = $(columns[2]).text().trim();
      rowData['QIB (x)'] = $(columns[3]).text().trim();
      rowData['sNII (x)'] = $(columns[4]).text().trim();
      rowData['bNII (x)'] = $(columns[5]).text().trim();
      rowData['NII (x)'] = $(columns[6]).text().trim();
      rowData['Retail (x)'] = $(columns[7]).text().trim();
      rowData['Employee (x)'] = $(columns[8]).text().trim();
      rowData['Others (x)'] = $(columns[9]).text().trim();
      rowData['Total (x)'] = $(columns[10]).text().trim();
      rowData['Applications'] = $(columns[11]).text().trim();
      rowData['Compare'] = $(columns[13]).text().trim();

      scrapedData.push(rowData);
    });

    res.json({ data: scrapedData });
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

// For the /yearfilter Endpoint
app.get('/yearfilter', async (req, res) => {
  const year = req.query.year || new Date().getFullYear().toString();
  console.log(year);
  try {
    const url = `https://www.chittorgarh.com/report/ipo-subscription-status-live-bidding-data-bse-nse/21/?year=${year}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scrapedData = [];

    const rows = $('table.table-bordered tbody tr');

    rows.each((index, row) => {
      const rowData = {
        'Company Link': '',
        'Company Name': '',
        'Close Date': '',
        'Size (Rs Cr)': '',
        'QIB (x)': '',
        'sNII (x)': '',
        'bNII (x)': '',
        'NII (x)': '',
        'Retail (x)': '',
        'Employee (x)': '',
        'Others (x)': '',
        'Total (x)': '',
        'Applications': '',
        'Compare': ''
      };

      const columns = $(row).find('td');

      rowData['Company Link'] = $(columns[0]).find('a').attr('href');
      rowData['Company Name'] = $(columns[0]).find('a').text().trim();
      rowData['Close Date'] = $(columns[1]).text().trim();
      rowData['Size (Rs Cr)'] = $(columns[2]).text().trim();
      rowData['QIB (x)'] = $(columns[3]).text().trim();
      rowData['sNII (x)'] = $(columns[4]).text().trim();
      rowData['bNII (x)'] = $(columns[5]).text().trim();
      rowData['NII (x)'] = $(columns[6]).text().trim();
      rowData['Retail (x)'] = $(columns[7]).text().trim();
      rowData['Employee (x)'] = $(columns[8]).text().trim();
      rowData['Others (x)'] = $(columns[9]).text().trim();
      rowData['Total (x)'] = $(columns[10]).text().trim();
      rowData['Applications'] = $(columns[11]).text().trim();
      rowData['Compare'] = $(columns[13]).text().trim();

      scrapedData.push(rowData);
    });

    res.json({ data: scrapedData });
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'An error occurred while scraping data.' });
  }
});

// Homepage
app.get('/', (req, res) => {
  res.status(200).json('API is working fine');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
