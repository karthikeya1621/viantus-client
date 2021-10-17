export const getPage = async (pageName: string) => {
  try {
    const response = await fetch(`${process.env.SERVER_API_URL}/${pageName}`);
    const result = await response.json();
    if (result.id) {
      return { status: 200, message: "Success", data: result };
    } else {
      return { status: 400, message: "Failed" };
    }
  } catch (e) {
    return { status: 405, message: "Server Error", error: e };
  }
};

export const getBlog = async (blogSlug?: string) => {
  try {
    const url = blogSlug
      ? `${process.env.SERVER_API_URL}/blogs/?slug=${blogSlug}`
      : `${process.env.SERVER_API_URL}/blogs/?_limit=1`;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return {
        status: 200,
        message: "Success",
        data: result instanceof Array ? result[0] : result,
      };
    } else {
      return { status: 400, message: "Failed" };
    }
  } catch (e) {
    return { status: 405, message: "Server Error", error: e };
  }
};

export const getService = async (serviceSlug?: string) => {
  try {
    const url = serviceSlug
      ? `${process.env.SERVER_API_URL}/services/?slug=${serviceSlug}`
      : `${process.env.SERVER_API_URL}/services/?_limit=1`;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return {
        status: 200,
        message: "Success",
        data: result instanceof Array ? result[0] : result,
      };
    } else {
      return { status: 400, message: "Failed" };
    }
  } catch (e) {
    return { status: 405, message: "Server Error", error: e };
  }
};

export const getSiteInfo = async () => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL
      }/site-info`
    );
    const result = await response.json();
    if (result.id) {
      return { status: 200, message: "Success", data: result };
    } else {
      return { status: 400, message: "Failed" };
    }
  } catch (e) {
    return { status: 405, message: "Server Error", error: e };
  }
};

export const getMenus = async () => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_API_URL || process.env.SERVER_API_URL
      }/menus`
    );
    const result = await response.json();
    if (result.id) {
      return { status: 200, message: "Success", data: result };
    } else {
      return { status: 400, message: "Failed" };
    }
  } catch (e) {
    return { status: 405, message: "Server Error", error: e };
  }
};

export const getConfig = () => {
  return {
    serverApiUrl: process.env.NEXT_PUBLIC_SERVER_API_URL || "",
  };
};
