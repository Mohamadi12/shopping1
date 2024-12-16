import { deleteBanner } from "@/actions/deleteBanner";
import { SubmitButton } from "@/components/global/submit-button/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const deleteBannerRoute = async ({params,}: {params: Promise<{ id: string }>}) => {
  const { id: productId } = await params;
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            banner and remove all data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/banner">Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="bannerId" value={productId} />
            <SubmitButton
              buttonText="Delete Product"
              className="bg-red-500 text-white hover:bg-red-700"
            />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default deleteBannerRoute;
