import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import {
  StyledContainer,
  StyledContainerHeader,
  StyledImage,
  StyledInfoDiv,
  StyledP,
  StyledContentContainer,
  Activity,
  SubInfoDiv,
  Pdiv,
  StyledBotton,
  StyledLink,
  StyledH1,
} from "./StyledMainView.js";

/**
 * Main view where the all user data will be presented.
 * @param {object} token - the user token.
 * @returns {object} - nextjs component.
 */
export default function MainView({ data }) {
  return (
    <StyledContainer>
      <StyledContainerHeader>
        <StyledInfoDiv>
          <StyledP>
            Commodity prices for the last 100 days in USD currency
          </StyledP>
        </StyledInfoDiv>
      </StyledContainerHeader>
      <StyledContentContainer>
        <>
          {data.data.map((obj, i) => {
            const categories = [];
            const matsData = [];
            const name = data.names[i].key;

            obj.forEach((item) => {
              categories.push(item._source.Date);
              matsData.push(item._source.High);
            });

            const state = {
              options: {
                chart: {
                  id: "basic-bar",
                },
                xaxis: {
                  categories: categories,
                },
              },
              series: [
                {
                  name: "price",
                  data: matsData,
                },
              ],
            };

            return (
              <div key={i}>
                <StyledH1 key={i}>{name}</StyledH1>
                <ApexCharts
                  key={i + 1}
                  options={state.options}
                  series={state.series}
                  type="line"
                  width="1000"
                />
              </div>
            );
          })}
        </>
      </StyledContentContainer>
    </StyledContainer>
  );
}
