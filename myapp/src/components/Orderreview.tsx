import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  Grid,
  Paper,
  Checkbox,
  Switch,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { grey, blue, lightGreen, lightBlue } from "@mui/material/colors";
import { useFormContext } from "react-hook-form";
import { db } from "../firebase/firebase";
import { useAppSelector } from "../store/store";
import { getDocs, query, where, collection } from "firebase/firestore";
import { producttype } from "../type";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface OrderReviewProps {
  sessions: number;
}

const Orderreview: React.FC<OrderReviewProps> = ({ sessions }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [totalprice, settotlprice] = useState(0);
  const [products, setproducts] = useState<producttype[]>([]);
  const [username, setusername] = useState<string | null>(null);
  const cart = useAppSelector((state) => state.cart);
  const [Enableddescount, setEnableddiscount] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  const auth = getAuth();

  const numberofallproducts = cart.products.reduce(
    (acu, cur) => acu + cur.n,
    0
  );


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setusername(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!username) return;

    const getdata = async () => {
      const q = query(collection(db, "users"), where("email", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        const idsprod = firstDoc.data().products || [];

        const chunks: { id: number; n: number }[][] = [];
        for (let i = 0; i < idsprod.length; i += 10) {
          chunks.push(idsprod.slice(i, i + 10));
        }
        let results2: producttype[] = [];

        for (const chunk of chunks) {
          const ids = chunk.map((item: { id: number,n:number }) => item.id);
          console.log(ids)
          const productsQuery = query(
            collection(db, "products"),
            where("id", "in", ids)
          );
          const productsSnapshot = await getDocs(productsQuery);
          const products = productsSnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setproducts(products as producttype[]);
        }

    
        const totalpriceofall = products.reduce((acu, cur) => {
          let num: { id: number; n: number };
          for (const chunk of chunks) {
          
              num = chunk.find((item: { n: number; id: number }) => {
                return item.id == cur.id;
              })!;
              if (num) {
                break;
              }
        
          }
          return acu + cur.price * (num!.n ?? 0);
        }, 0);
        settotlprice(totalpriceofall);
      }
    };

    getdata();
  }, [username]);

  const discountRate = (4 + Enableddescount) / 100;
  const discountedPrice = totalprice - discountRate * totalprice;

  return (
    <Paper sx={{ backgroundColor: grey[100], height: "100%" }} elevation={1}>
      <Box sx={{ padding: { xs: "15px", lg: 4 }, pt: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          ORDER OVERVIEW
        </Typography>

        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "25px 0px 40px 0px",
          }}
        >
          <Switch
            checked={checked}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setChecked(isChecked);
              setEnableddiscount(isChecked ? 5 : 0);
            }}
            color="success"
            size="medium"
          />
          <Typography sx={{ fontSize: "13px", fontWeight: "bold" }}>
            Pay in advance - <Box component="span">EXTRA 5% DISCOUNT</Box>
          </Typography>
        </Stack>

        <Stack spacing={2} mt={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ color: grey[500], textTransform: "uppercase" }}
            >
              Number of items:
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {numberofallproducts}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ color: grey[500], textTransform: "uppercase" }}
            >
              Regular Price:
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              <del>{totalprice.toFixed(2)}€</del>
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="body2"
              sx={{ color: grey[500], textTransform: "uppercase" }}
            >
              Your Price:
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {discountedPrice.toFixed(2)}€
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ color: lightGreen[500], textTransform: "uppercase" }}
          >
            <Typography variant="body2">
              Discount {4 + Enableddescount}%
            </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "21px" }}>
              -{(totalprice * discountRate).toFixed(2)}€
            </Typography>
          </Stack>
        </Stack>

        <Divider
          sx={{
            borderColor: "white",
            borderWidth: "2px",
            margin: "10px 0px",
          }}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginTop: 3 }}
        >
          <Typography
            variant="body2"
            sx={{ color: grey[500], textTransform: "uppercase" }}
          >
            Setup fee
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: lightBlue[800],
              fontSize: "21px",
            }}
          >
            00.00€
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ marginTop: 2 }}
        >
          <Typography
            variant="body2"
            sx={{ color: grey[500], textTransform: "uppercase" }}
          >
            Total P.M.
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              color: lightBlue[800],
              fontSize: "21px",
            }}
          >
            {discountedPrice.toFixed(2)}€
          </Typography>
        </Stack>

        <FormControlLabel
          control={<Checkbox {...register("terms")} />}
          sx={{ alignItems: "flex-start", fontSize: "14px" }}
          label={
            <Typography
              variant="body2"
              component="span"
              sx={{ color: grey[400], marginTop: "8px" }}
            >
              I accept the{" "}
              <span style={{ color: blue[500] }}>Terms & Conditions</span> and
              understand my{" "}
              <span style={{ color: blue[500] }}>right of withdrawal</span> as
              well as the circumstances that lead to repeal of the same
            </Typography>
          }
        />
        {errors.terms && (
          <FormHelperText error>{(errors.terms as any).message}</FormHelperText>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            padding: "15px",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: 2,
            fontSize: "18px",
            color: "#fff",
            background: "linear-gradient(to left, #64b5f6, #1976d2)",
            "&:hover": {
              background: "linear-gradient(to left, #42a5f5, #1565c0)",
            },
          }}
        >
          Order Now
        </Button>
      </Box>
    </Paper>
  );
};

export default Orderreview;
