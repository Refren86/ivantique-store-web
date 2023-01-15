import { gql } from '@apollo/client';

const GET_SLIDES_AND_CATEGORIES = gql`
  query {
    sliderContents {
      data {
        attributes {
          title
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    categories {
      data {
        attributes {
          name
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_FURNITURE = gql`
  query {
    furnitures {
      data {
        id
        attributes {
          name
          description
          oldPrice
          newPrice
          urlSlug
          slug
          materials {
            data {
              attributes {
                name
              }
            }
          }
          manufactorer {
            data {
              attributes {
                name
              }
            }
          }
          style {
            data {
              attributes {
                name
              }
            }
          }
          century {
            data {
              attributes {
                value
              }
            }
          }
          depth
          width
          height
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const GET_FURNITURE_BY_CATEGORY = gql`
  query FurnitureByCategory($category: String!) {
    furnitures(filters: { category: { slug: { contains: $category } } }) {
      data {
        id
        attributes {
          name
          description
          oldPrice
          newPrice
          urlSlug
          slug
          materials {
            data {
              attributes {
                name
              }
            }
          }
          manufactorer {
            data {
              attributes {
                name
              }
            }
          }
          style {
            data {
              attributes {
                name
              }
            }
          }
          century {
            data {
              attributes {
                value
              }
            }
          }
          depth
          width
          height
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const GET_FURNITURE_BY_SLUG = gql`
  query FurnitureBySlug($slug: String!) {
    furnitures(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          name
          description
          oldPrice
          newPrice
          urlSlug
          slug
          materials {
            data {
              attributes {
                name
              }
            }
          }
          manufactorer {
            data {
              attributes {
                name
              }
            }
          }
          style {
            data {
              attributes {
                name
              }
            }
          }
          century {
            data {
              attributes {
                value
              }
            }
          }
          depth
          width
          height
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const GET_FURNITURE_BY_SLUGS = gql`
  query FurnitureBySlugs($slugs: [String]!) {
    furnitures(filters: { slug: { in: $slugs } }) {
      data {
        id
        attributes {
          name
          description
          oldPrice
          newPrice
          urlSlug
          slug
          materials {
            data {
              attributes {
                name
              }
            }
          }
          manufactorer {
            data {
              attributes {
                name
              }
            }
          }
          style {
            data {
              attributes {
                name
              }
            }
          }
          century {
            data {
              attributes {
                value
              }
            }
          }
          depth
          width
          height
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export {
  GET_ALL_FURNITURE,
  GET_FURNITURE_BY_CATEGORY,
  GET_SLIDES_AND_CATEGORIES,
  GET_FURNITURE_BY_SLUG,
  GET_FURNITURE_BY_SLUGS,
};