import { ZippopotamProps } from "@/types/api.types"
import { Table } from "@components/Generic/Table.component";

interface PostalCodeDataProps {
  data: ZippopotamProps;
}

export const PostalCodeData = ({ data }: PostalCodeDataProps) => {
  const { places, ...dataProps} = data;

  return (
    <div className="mt-4">
      <h2 className="text-heading-m font-bold">Postal code details</h2>
      <div className="mt-2">
        <Table heading={[]} items={Object.entries(dataProps)} />

        <h2 className="text-heading-m mt-4 font-bold">Places at postal code</h2>
        {
          places.map(({ 'place name': placeName, ...place}) => (
            <div className="mt-2">
              <div className="text-regular-l">{placeName}</div>
              <Table heading={[]} items={Object.entries(place)} />
            </div>
          ))
        }     
      </div>
    </div>
  )
}