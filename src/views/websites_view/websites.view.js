import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import SearchBar from "../../components/searchbar/search_bar";
import { Link, useHistory } from "react-router-dom";

import { ClientsService } from "../../services/clients.service";

import { faTrash, faCog, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "../../customHooks/custom_hooks";

export default function WebsitesView() {
  const [clientData, setClientData] = useState(undefined);
  const [filteredData, setFilteredData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("name");
  const {data, status} = useQuery({url:'/clients', requestType:'get'})

  const clientsService = new ClientsService();

  // useEffect(() => {
  //   getClients();
  // }, []);
   console.log(data, 'data')

  // const setter = () => {
  //   if(data){
  //     setClientData(data)
  //   }
  //   return false
  // }
  const handleCallback = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
  const handleSecondCallback = (def) => {
    setFilter(def);
  };
  const getClients = () => {
    clientsService
      .getClients()
      .then((response) => {
        // console.log("Get clients response: ", response);

        console.log(response.status);

        setClientData(response["data"]);
      })
      .catch((error) => {
        console.log("Something went wrong: ", error);
      });
  };

  // useEffect(() => {
  //   if (filter === "name") {
  //     setFilteredData(
  //       clientData?.filter((client) =>
  //         client.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //   }
  //   if (filter === "address") {
  //     setFilteredData(
  //       clientData?.filter((client) => client.address.includes(searchTerm))
  //     );
  //   }
  // }, [searchTerm]);


  const deleteWebsite = (id) => {
    clientsService
      .deleteClient(id)
      .then((response) => {
        console.log("Get clients response: ", response);
        getClients();
      })
      .catch((error) => {
        console.log("Something went wrong: ", error);
        getClients();
      });
  };
  console.log(status, 'status from hook')
 console.log(data, 'helloo from the other sideeeeee')
  return (  
    <div>
      <Container>
        <Row>
          <Col className="text-center my-5">
            <Card className="p-3">
              <div className="display-5 py-3">
                Websites
                <SearchBar
                  handleCallback={handleCallback}
                  handleSecondCallback={handleSecondCallback}
                />
              </div>
              {data  ? (
                <Table className="py-5" striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Creation</th>
                      <th>Last Change</th>
                      <th>Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData ? filteredData : data.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.address}</td>
                        <td>
                          <span className="badge badge-info">{row.status}</span>
                        </td>
                        <td>{row.description}</td>
                        <td>{new Date(row.created_at).toLocaleDateString()}</td>
                        <td>{new Date(row.updated_at).toLocaleDateString()}</td>
                        <td>
                          <div className="row mx-1">
                            <div className="col-4">
                              <Link to={"/clients/" + row.id + "/history"}>
                                <Button
                                  className="btn-sm px-3"
                                  onClick={() => this.goToHistory(row.id)}
                                  variant="primary"
                                >
                                  <FontAwesomeIcon icon={faClock} />
                                </Button>
                              </Link>
                            </div>
                            <div className="col-4">
                              <Link to={"/clients/" + row.id + "/edit"}>
                                <Button className="btn-sm px-3" variant="info">
                                  <FontAwesomeIcon icon={faCog} />
                                </Button>
                              </Link>
                            </div>
                            <div className="col-4">
                              <Button
                                className="btn-sm px-3"
                                onClick={() => deleteWebsite(row.id)}
                                variant="danger"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="mx-auto text-center">
                  <Spinner animation="border" />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// export class WebsitesView extends Component {
//   constructor(props) {
//     super(props);
//     this.clientsService = new ClientsService();
//     this.state = { clientData: undefined };
//   }

//   componentDidMount() {
//     console.log("Props: ", this.props);
//     this.getClients();
//   }

//   getClients() {
//     this.setState({ clientData: undefined });
//     this.clientsService
//       .getClients()
//       .then((response) => {
//         console.log("Get clients response: ", response);
//         // response['data'] = response['data'].filter( client => client.type === 'website' );
//         this.setState({ clientData: response["data"] });
//       })
//       .catch((error) => {
//         console.log("Something went wrong: ", error);
//       });
//   }

//   deleteWebsite(id) {
//     this.clientsService
//       .deleteClient(id)
//       .then((response) => {
//         console.log("Get clients response: ", response);
//         this.getClients();
//       })
//       .catch((error) => {
//         console.log("Something went wrong: ", error);
//         this.getClients();
//       });
//   }

//   render() {
//     return (
//       <Container>
//         <Row>
//           <Col className="text-center my-5">
//             <Card className="p-3">
//               <div className="display-5 py-3">Websites

//               <SearchBar/>
//               </div>
//               {this.state.clientData ? (
//                 <Table className="py-5" striped hover>
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Name</th>
//                       <th>Address</th>
//                       <th>Status</th>
//                       <th>Description</th>
//                       <th>Creation</th>
//                       <th>Last Change</th>
//                       <th>Tools</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {this.state.clientData.map((row) => (
//                       <tr key={row.id}>
//                         <td>{row.id}</td>
//                         <td>{row.name}</td>
//                         <td>{row.address}</td>
//                         <td>
//                           <span className="badge badge-info">{row.status}</span>
//                         </td>
//                         <td>{row.description}</td>
//                         <td>{new Date(row.created_at).toLocaleDateString()}</td>
//                         <td>{new Date(row.updated_at).toLocaleDateString()}</td>
//                         <td>
//                           <div className="row mx-1">
//                             <div className="col-4">
//                               <Link to={"/clients/" + row.id + "/history"}>
//                                 <Button
//                                   className="btn-sm px-3"
//                                   onClick={() => this.goToHistory(row.id)}
//                                   variant="primary"
//                                 >
//                                   <FontAwesomeIcon icon={faClock} />
//                                 </Button>
//                               </Link>
//                             </div>
//                             <div className="col-4">
//                               <Link to={"/clients/" + row.id + "/edit"}>
//                                 <Button className="btn-sm px-3" variant="info">
//                                   <FontAwesomeIcon icon={faCog} />
//                                 </Button>
//                               </Link>
//                             </div>
//                             <div className="col-4">
//                               <Button
//                                 className="btn-sm px-3"
//                                 onClick={() => this.deleteWebsite(row.id)}
//                                 variant="danger"
//                               >
//                                 <FontAwesomeIcon icon={faTrash} />
//                               </Button>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               ) : (
//                 <div className="mx-auto text-center">
//                   <Spinner animation="border" />
//                 </div>
//               )}
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }
