import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";
import { getNewsletters } from "../../services/newsletter.service";

function EmailTemplate() {
  const [newsLetterArr, setNewsLetterArr] = useState([]);

  const getNews = async () => {
    try {
      const { data: res } = await getNewsletters();
      if (res) {
        setNewsLetterArr(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const blog_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      //   width: "20%",
    },
    {
      name: "Author",
      cell: (row) => <p>{row.description}</p>,
      sortable: false,
      searchable: false,
      //   width: "20%",
    },
  ];

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Emails</h5>
                <div className="d-flex gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW Email" path="/Email/post/create" />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={blog_columns} data={newsLetterArr} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EmailTemplate;
