class SaturnIntegration {
  init(user: any) {
    if (!user) {
      window.removeEventListener("saturn:ready", () => {});
      // @ts-ignore
      window?.$saturn?.reset?.();
      return;
    }

    const userData = user;

    setTimeout(() => {
      console.log("calling setuser", userData);
      // @ts-ignore
      if (window?.$saturn && window?.$saturn?.isLoaded) {
        // @ts-ignore
        window.$saturn.isUserLoaded = false;
        // @ts-ignore
        window.$saturn.setUser(userData?.uid, {
          email: userData?.email,
          name: userData?.name,
        });
      } else {
        window.addEventListener(
          "saturn:ready",
          function () {
            if (userData) {
              // @ts-ignore
              window.$saturn.setUser(userData.uid, {
                email: userData.email,
                name: userData.name,
              });
            }
          },
          { once: true }
        );
      }
    }, 1000);
  }

  reset() {
    // @ts-ignore
    if (window?.$saturn && window?.$saturn?.isLoaded) {
      // @ts-ignore
      window?.$saturn?.reset?.();
    }
  }
}

export const saturnIntegration = new SaturnIntegration();
