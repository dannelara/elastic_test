// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import EClient from "../../utils/EClient.js";
import dotenv from "dotenv";
import next from "next";

dotenv.config();

async function fetchTestData() {
  const clinet = await new EClient().getObject();

  const names = await clinet.search({
    index: "commodities",
    size: 0,
    aggs: {
      symbols: {
        terms: {
          field: "Symbol.keyword",
        },
      },
    },
  });

  const matsInfo = [];

  for (const symbol of names.aggregations.symbols.buckets) {
    const data_year_2010 = await clinet
      .search({
        index: "commodities",
        size: 0,
        query: {
          match: {
            "Symbol.keyword": symbol.key,
          },
        },
        aggs: {
          data: {
            top_hits: {
              size: 100,
              sort: [
                {
                  timeStamp: {
                    order: "desc",
                  },
                },
              ],
            },
          },
        },
      })
      .then((e) => {
        return e.aggregations.data.hits.hits;
      });

    matsInfo.push([...data_year_2010.reverse()]);
  }
  const data = {
    names: names.aggregations.symbols.buckets,
    data: matsInfo,
  };

  return data;
}

export default async function fetchData(req, res, next) {
  let data;
  try {
    data = await fetchTestData();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json(data);
}
