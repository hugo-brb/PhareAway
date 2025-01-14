import { Component } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface User {
  id: number;
  mail: string;
  name: string;
  password: string;
}

interface AssoData {
  user: User;
  url: string;
}

// Instead of empty interfaces, we define proper types
type AssoProps = Record<string, never>; // Type for empty props object
type AssoState = AssoData; // State inherits from AssoData

class Asso extends Component<AssoProps, AssoState> {
  constructor(props: AssoProps) {
    super(props);

    this.state = {
      user: {
        id: -1,
        mail: "",
        name: "",
        password: "",
      },
      url: "",
    };
  }

  async create(user: User, url: string): Promise<void> {
    try {
      await supabaseData.from("Asso").insert({
        user,
        url,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async read(id: number): Promise<AssoData | undefined> {
    try {
      const { data, error } = await supabaseData
        .from("Asso")
        .select()
        .eq("id", id);

      if (error) {
        throw error;
      }

      if (!data?.[0]) {
        return undefined;
      }

      return {
        user: data[0].user,
        url: data[0].url,
      };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async update(user: User, url: string): Promise<void> {
    try {
      await supabaseData.from("Asso").update({
        user,
        url,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async deleteEntry(id: number): Promise<void> {
    try {
      await supabaseData.from("Asso").delete().eq("id", id);
    } catch (e) {
      console.error(e);
    }
  }

  delete(): void {
    this.setState({
      user: {
        id: -1,
        mail: "",
        name: "",
        password: "",
      },
      url: "",
    });
  }
}

export default Asso;
